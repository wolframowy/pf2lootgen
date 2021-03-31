import pandas as pd
import numpy as np
import argparse
from random import randrange
from enum import Enum


class Rarity:
    COMMON = 'COMMON'
    UNCOMMON = 'UNCOMMON'
    RARE = 'RARE'


class ItemType():
    PERMANENT = 'PERMANENT'
    CONSUMABLE = 'CONSUMABLE'


class LootGen:

    def __init__(self):
        self.treasure_table = pd.read_csv('treasure_by_level.csv', sep=';')
        items = pd.read_csv('items.csv', sep=';').astype({'ID': 'int32', 'Lvl': 'int32', 'Price': 'float32'})
        self.cons = items[items['Traits'].str.contains('Consumable')]
        self.perm = items[~items['Traits'].str.contains('Consumable')]
        self.perm_common = self.perm[self.perm['Rarity'] == 'Common']
        self.perm_uncommon = self.perm[self.perm['Rarity'] == 'Uncommon']
        self.perm_rare = self.perm[self.perm['Rarity'] == 'Rare']
        self.cons_common = self.cons[self.cons['Rarity'] == 'Common']
        self.cons_uncommon = self.cons[self.cons['Rarity'] == 'Uncommon']
        self.cons_rare = self.cons[self.cons['Rarity'] == 'Rare']

    @staticmethod
    def __row_to_primitive__(series):
        arr = []
        for v in series.values.tolist():
            if type(v) == np.int32 or type(v) == np.int64:
                arr.append(int(v))
            if type(v) == str:
                arr.append(v)
        return arr

    def generate_loot_for_player_level(self, pt_lvl: int, pt_size: int, rarity: str = None):
        if not rarity:
            rarity = Rarity.RARE
        v = self.treasure_table[self.treasure_table['Level'] == pt_lvl]
        perm_ct = eval(v.iloc[0]['Permanent'])
        cons_ct = eval(v.iloc[0]['Consumables'])
        curr = int(v.iloc[0]['Currency'])
        extra = max(0, pt_size - 4)
        curr += extra * int(v.iloc[0]['AddCurr'])
        perm_ct[str(pt_lvl)] += extra
        cons_ct[str(pt_lvl)] += extra
        cons_ct[str(pt_lvl + 1)] += extra
        r_perm = []
        r_cons = []
        perm_pool = self.perm_common if rarity == Rarity.COMMON else (pd.concat([self.perm_common, self.perm_uncommon])
                                                                      if rarity == Rarity.UNCOMMON else self.perm)
        cons_pool = self.cons_common if rarity == Rarity.COMMON else (pd.concat([self.cons_common, self.cons_uncommon])
                                                                      if rarity == Rarity.UNCOMMON else self.cons)
        for key, val in perm_ct.items():
            subset = perm_pool[perm_pool['Lvl'] == int(key)]
            n = subset.shape[0]
            for i in range(val):
                test = subset.iloc[randrange(n)].values
                r_perm.append(self.__row_to_primitive__(subset.iloc[randrange(n)]))
        for key, val in cons_ct.items():
            subset = cons_pool[cons_pool['Lvl'] == int(key)]
            n = subset.shape[0]
            if not n:
                continue
            for i in range(val):
                r_cons.append(self.__row_to_primitive__(subset.iloc[randrange(n)]))
        return r_perm, r_cons, curr

    def generate_items_of_level(self, ilvl: int, n: int, rarity=None, item_type=None):
        if n > 50:
            n = 50
        if not rarity:
            rarity = Rarity.COMMON
        if not item_type:
            item_type = ItemType.PERMANENT
        ret = []
        if item_type == ItemType.PERMANENT:
            pool = self.perm_rare if rarity == Rarity.RARE else (self.perm_uncommon if rarity == Rarity.UNCOMMON
                                                                 else self.perm_common)
        else:
            pool = self.cons_rare if rarity == Rarity.RARE else (self.cons_uncommon if rarity == Rarity.UNCOMMON
                                                                 else self.cons_common)
        pool = pool[pool['Lvl'] == ilvl]
        ct = pool.shape[0]
        if not ct:
            return ret
        for i in range(n):
            ret.append(self.__row_to_primitive__(pool.iloc[randrange(ct)]))
        return ret


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
