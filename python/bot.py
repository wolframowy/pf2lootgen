import os
import json
import time
import urllib
import argparse

import discord
from discord.ext import commands
from discord.ext.commands import CommandNotFound

from loot_gen import LootGen, Rarity, ItemType


RARITY_MAP = {
    'c': Rarity.COMMON,
    'u': Rarity.UNCOMMON,
    'r': Rarity.RARE
}

ITEM_TYPE_MAP = {
    'p': ItemType.PERMANENT,
    'c': ItemType.CONSUMABLE
}

OPTIONS = {
    'help': '-h',
    'party': '-p',
    'items': '-i'
}

prefix = '-p2lg '
bot = commands.Bot(command_prefix=prefix)


def get_rarity(opts):
    if 'r' in opts and opts['r'] in RARITY_MAP:
        return RARITY_MAP[opts['r']]
    return None


def get_item_type(opts):
    if 't' in opts and opts['t'] in ITEM_TYPE_MAP:
        return ITEM_TYPE_MAP[opts['t']]
    return None


@bot.event
async def on_ready():
    print('We have logged in as {0.user}'.format(bot))
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening,
                                                        name=prefix + OPTIONS['help']))


@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, CommandNotFound):
        await ctx.channel.send('Command not found. Type "-pf2gen h" for list of options')
        return
    raise error


@bot.command(name=OPTIONS['help'])
async def command_help(ctx):
    await ctx.author.send(
        f'**Here are the commands available to you:**'
        f'\n```{OPTIONS["help"]} - display bot help'
        f'\n{OPTIONS["party"]} party_level party_size [-r rarity] -'
        f' generate whole level worth of loot for party of given level and size'
        f'\n> party_level - INTEGER: average level of party'
        f'\n> party_size - INTEGER: number of PCs in party'
        f'\n> rarity - OPTIONAL CHARACTER: '
        f'Rarity up to which the items will be generated, "c" - Common, "u" - Uncommon, "r" - Rare (Default)'
        f'\n{OPTIONS["items"]} item_level number_of_items [-r rarity] [-t type] '
        f'- generate given number of items of given level'
        f'\n> item_level - INTEGER: level of items to be generated'
        f'\n> number_of_items - INTEGER: number of items to be generated'
        f'\n> rarity - OPTIONAL CHARACTER: rarity of generated items, "c" - Common (Default), "u" - Uncommon, "r" - Rare'
        f'\n> type - OPTIONAL CHARACTER: type of items to be generated, "p" - Permanent (Default), "c" - Consumable```')


@bot.command(name=OPTIONS['party'])
async def party(ctx, *, message: str):
    args = message.split(' ')
    p_lvl = int(args[0])
    p_size = int(args[1])
    opts = {}
    if len(args) > 3:
        for k, v in zip(args[2:], args[3:] + ['-']):
            if k.startswith('-'):
                opts[k.strip('-')] = v
    r_perm, r_cons, curr = loot_gen.generate_loot_for_player_level(p_lvl, p_size,
                                                                   rarity=get_rarity(opts))
    msg = '**Generated permanent items:**'
    if not r_perm:
        msg += f'\n> None item matched given criteria'
    else:
        for perm in r_perm:
            msg += f'\n> {perm["count"]}x Name: *{perm["Title"]}*, Level: *{perm["Lvl"]}*,' \
                   f' Rarity: *{perm["Rarity"]}*, Price: *{perm["Price"]} GP*, Link: <{perm["URL"]}>'
    await ctx.channel.send(msg)
    msg = '**Generated consumables:**'
    if not r_cons:
        msg += f'\n> None item matched given criteria'
    else:
        for cons in r_cons:
            msg += f'\n> {cons["count"]}x Name: *{cons["Title"]}*, Level: *{cons["Lvl"]}*,' \
                   f' Rarity: *{cons["Rarity"]}*, Price: *{cons["Price"]} GP*, Link: <{cons["URL"]}>'
    await ctx.channel.send(msg)
    msg = f'**Total currency in coins or valuables: {curr} GP**'
    await ctx.channel.send(msg)


@bot.command(name=OPTIONS['items'])
async def items(ctx, *, message: str):
    args = message.split(' ')
    ilvl = int(args[0])
    n = int(args[1])
    opts = {}
    if len(args) > 3:
        for k, v in zip(args[2:], args[3:] + ['-']):
            if k.startswith('-'):
                opts[k.strip('-')] = v
    r = loot_gen.generate_items_of_level(ilvl, n, rarity=get_rarity(opts),
                                         item_type=get_item_type(opts))
    msg = '**Generated items:**'
    if not r:
        msg += f'\n> None item matched given criteria'
    else:
        for item in r:
            if len(msg) > 1500:
                await ctx.channel.send(msg)
                msg = ''
            msg += f'\n> {item["count"]}x Name: *{item["Title"]}*, Level: *{item["Lvl"]}*,' \
                   f' Rarity: *{item["Rarity"]}*, Price: *{item["Price"]} GP*, Link: <{item["URL"]}>'
    await ctx.channel.send(msg)


@party.error
@items.error
async def default_error(ctx, error):
    await ctx.channel.send(f'{type(error).__name__} Something went wrong. '
                           f'Type "{prefix} + {OPTIONS["help"]}" for list of options')


loot_gen = LootGen()
item_parser = argparse.ArgumentParser()
item_parser.add_argument('ilvl', metavar='ilvl', type=int)
item_parser.add_argument('N', metavar='n', type=int)
item_parser.add_argument('-r', metavar='rarity', type=int)
item_parser.add_argument('-t', metavar='type', type=int)

group_parser = argparse.ArgumentParser()
group_parser.add_argument('pt_lvl', metavar='pt_lvl', type=int)
group_parser.add_argument('pt_size', metavar='pt_size', type=int)
group_parser.add_argument('-r', metavar='rarity', type=int)


loop_value = True
iteration = 0
# wait for connection to be established
while loop_value:
    try:
        urllib.request.urlopen("https://google.com")
        loop_value = False
    except urllib.error.URLError as e:
        print('Network is currently down')
        iteration += 1
        if iteration > 100:
            break
        time.sleep(5)
file_dir = os.path.dirname(__file__)
with open(os.path.join(file_dir, './../token.json')) as fh:
    bot.run(json.load(fh)['token'])
