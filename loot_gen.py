import pandas as pd
import argparse
from random import randrange


class LootGen:

    def __init__(self):
        self.treasure_table = pd.read_csv('treasure_by_level.csv', sep=';')
        items = pd.read_csv('items.csv', sep=';')
        self.cons = items[items['Traits'].str.contains('Consumable')]
        self.perm = items[~items['Traits'].str.contains('Consumable')]
        self.perm_common = self.perm[self.perm['Rarity'] == 'Common']
        self.perm_uncommon = self.perm[self.perm['Rarity'] == 'Uncommon']
        self.perm_rare = self.perm[self.perm['Rarity'] == 'Rare']
        self.cons_common = self.cons[self.cons['Rarity'] == 'Common']
        self.cons_uncommon = self.cons[self.cons['Rarity'] == 'Uncommon']
        self.cons_rare = self.cons[self.cons['Rarity'] == 'Rare']

    def generate_loot(self, pt_lvl: int, pt_size: int):
        v = self.treasure_table[self.treasure_table['Level'] == pt_lvl]
        perm = eval(v.iloc[0]['Permanent'])
        cons = eval(v.iloc[0]['Consumables'])
        curr = v.iloc[0]['Currency']
        extra = max(0, pt_size - 4)
        curr += extra * v.iloc[0]['AddCurr']
        perm[str(pt_lvl)] += extra
        cons[str(pt_lvl)] += extra
        cons[str(pt_lvl + 1)] += extra
        r_perm = []
        r_cons = []
        for key, val in perm.items():
            subset = self.perm[self.perm['Lvl'] == int(key)]
            n = subset.shape[0]
            for i in range(val):
                r_perm.append(subset.iloc[randrange(n)].values.tolist())
        for key, val in cons.items():
            subset = self.cons[self.cons['Lvl'] == int(key)]
            n = subset.shape[0]
            for i in range(val):
                r_cons.append(subset.iloc[randrange(n)].values.tolist())
        return r_perm, r_cons, curr


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate loot for specific level and party size')
    parser.add_argument('pt_lvl', metavar='pt_lvl', type=int, help='Average level of party')
    parser.add_argument('pt_size', metavar='pt_size', type=int, help='Size of a party')
    args = parser.parse_args()
    loot_gen = LootGen()
    p, c, cu = loot_gen.generate_loot(args.pt_lvl, args.pt_size)
    print(f'Permanent items:')
    for r in p:
        print(r)
    print(f'Consumables:')
    for r in c:
        print(r)
    print(f'{cu} gp')
