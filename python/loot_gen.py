import os
import argparse
import json
import csv
from random import randrange

class Rarity:
    COMMON = 'COMMON'
    UNCOMMON = 'UNCOMMON'
    RARE = 'RARE'


class ItemType:
    PERMANENT = 'PERMANENT'
    CONSUMABLE = 'CONSUMABLE'

BASE_URL = 'https://2e.aonprd.com'

def parse_treasure_csv(path):
    reader = csv.DictReader(open(path), delimiter=';')
    treasure_table = []
    for row in reader:
        treasure_table.append({
            'Level': int(row['Level']),
            'TotVal': int(row['TotVal']),
            'Permanent': json.loads(row['Permanent']),
            'Consumables': json.loads(row['Consumables']),
            'Currency': int(row['Currency']),
            'AddCurr': int(row['AddCurr'])
        })
    return treasure_table

def fillNa(arr, key, val):
    for row in arr:
        if key not in row.keys():
            row[key] = val

def mapVals(arr, key, func):
    for row in arr:
        row[key] = func(row[key])


class LootGen:

    def __init__(self):
        file_dir = os.path.dirname(__file__)
        self.treasure_table = parse_treasure_csv(os.path.join(file_dir, './../db/treasure_by_level.csv'))
        source_json = json.loads(open(os.path.join(file_dir, './../db/items.json')).read())
        item_list = [v['_source'] for v in source_json['hits']['hits']]
        fillNa(item_list, 'trait_raw', [])
        fillNa(item_list, 'price', 0)
        mapVals(item_list, 'price', lambda p: p/100)
        mapVals(item_list, 'url', lambda u: BASE_URL + u)
        self.cons = [x for x in item_list if 'Consumable' in x['trait_raw']]
        self.perm = [x for x in item_list if 'Consumable' not in x['trait_raw']]
        self.perm_common = [x for x in self.perm if x['rarity'] == 'common']
        self.perm_uncommon = [x for x in self.perm if x['rarity'] == 'uncommon']
        self.perm_rare = [x for x in self.perm if x['rarity'] == 'rare']
        self.cons_common = [x for x in self.cons if x['rarity'] == 'common']
        self.cons_uncommon = [x for x in self.cons if x['rarity'] == 'uncommon']
        self.cons_rare = [x for x in self.cons if x['rarity'] == 'rare']

    def generate_loot_for_player_level(self, pt_lvl: int, pt_size: int, rarity: str = None):
        if not rarity:
            rarity = Rarity.RARE
        v = next((x for x in self.treasure_table if x['Level'] == pt_lvl))
        perm_ct = v['Permanent']
        cons_ct = v['Consumables']
        curr = v['Currency']
        extra = max(0, pt_size - 4)
        curr += extra * v['AddCurr']
        perm_ct[str(pt_lvl)] += extra
        cons_ct[str(pt_lvl)] += extra
        cons_ct[str(min(20, pt_lvl + 1))] += extra
        r_perm = {}
        r_cons = {}
        perm_pool = self.perm_common if rarity == Rarity.COMMON else (pd.concat([self.perm_common, self.perm_uncommon])
                                                                      if rarity == Rarity.UNCOMMON else self.perm)
        cons_pool = self.cons_common if rarity == Rarity.COMMON else (pd.concat([self.cons_common, self.cons_uncommon])
                                                                      if rarity == Rarity.UNCOMMON else self.cons)
        for key, val in perm_ct.items():
            subset = [x for x in perm_pool if x['level'] == int(key)]
            n = len(subset)
            for i in range(val):
                entry = subset[randrange(n)]
                if(entry['id'] in r_perm.keys()):
                    r_perm[entry['id']]['count'] += 1
                else:
                    r_perm[entry['id']] = { **entry, 'count': 1 }
        for key, val in cons_ct.items():
            subset = [x for x in cons_pool if x['level'] == int(key)]
            n = len(subset)
            if not n:
                continue
            for i in range(val):
                entry =  subset[randrange(n)]
                if(entry['id'] in r_perm.keys()):
                    r_cons[entry['id']]['count'] += 1
                else:
                    r_cons[entry['id']] = { **entry, 'count': 1 }
        return list(r_perm.values()), list(r_cons.values()), curr

    def generate_items_of_level(self, ilvl: int, n: int, rarity=None, item_type=None):
        if n > 50:
            n = 50
        if not rarity:
            rarity = Rarity.COMMON
        if not item_type:
            item_type = ItemType.PERMANENT
        ret = {}
        if item_type == ItemType.PERMANENT:
            pool = self.perm_rare if rarity == Rarity.RARE else (self.perm_uncommon if rarity == Rarity.UNCOMMON
                                                                 else self.perm_common)
        else:
            pool = self.cons_rare if rarity == Rarity.RARE else (self.cons_uncommon if rarity == Rarity.UNCOMMON
                                                                 else self.cons_common)
        pool = [x for x in pool if x['level'] == ilvl]
        ct = len(pool)
        if not ct:
            return ret
        for i in range(n):
            entry = pool[randrange(ct)]
            if(entry['id'] in ret.keys()):
                ret[entry['id']]['count'] += 1
            else:
                ret[entry['id']] = { **entry, 'count': 1 }
        return list(ret.values())


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate loot for specific level and party size')
    subparsers = parser.add_subparsers(help='sub-command help', dest='subparser_name')

    parser_party = subparsers.add_parser('party', help='party help')
    parser_party.add_argument('pt_lvl', metavar='pt_lvl', type=int, help='Integer - Average level of party')
    parser_party.add_argument('pt_size', metavar='pt_size', type=int, help='Integer - Size of a party')
    parser_party.add_argument('--rarity', metavar='rarity', type=int,
                              help='Integer - Rarity up to which items will be generated,' +
                                   ' 1 - Common, 2 - Uncommon, 3 (default) - Rare')

    parser_items = subparsers.add_parser('items', help='items help')
    parser_items.add_argument('ilvl', metavar='ilvl', type=int, help='Integer - Level of items to be generated')
    parser_items.add_argument('N', metavar='n', type=int, help='Integer - Number of items to be generated')
    parser_items.add_argument('--rarity', metavar='rarity', type=int,
                              help='Integer - Rarity of items, 1 - Common, 2 - Uncommon, 3 - Rare')
    parser_items.add_argument('--type', metavar='type', type=int,
                              help='Integer - Type of items, 1 - Permanent, 2 - Consumable')
    args = parser.parse_args()
    loot_gen = LootGen()
    if args.subparser_name == 'party':
        p, c, cu = loot_gen.generate_loot_for_player_level(args.pt_lvl, args.pt_size,
                                                           args.rarity if args.rarity else Rarity.RARE)
        print('Permanent items:')
        for r in p:
            print(r)
        print('Consumables:')
        for r in c:
            print(r)
        print(f'{cu} gp')
    elif args.subparser_name == 'items':
        p = loot_gen.generate_items_of_level(args.ilvl, args.N, args.rarity if args.rarity else Rarity.COMMON,
                                             args.type if args.type else ItemType.PERMANENT)
        for r in p:
            print(r)
    else:
        print('Command not supported!')
