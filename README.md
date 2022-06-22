# pf2lootgen
> Tags: Pathfinder 2e pf2 item equipment generator
>
Loot generator for pathfinder 2nd edition. It has two modes: `party` and `items`. 

`party` mode generates items for current party level with adjustments for additional PCs.
`items` mode generates given number of items of selected level.

This tool uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy ([paizo.com/communityuse](https://paizo.com/community/communityuse)). We are expressly prohibited from charging you to use or access this content. This tool is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit paizo.com.

## Installing / Getting started

Just to add my bot to your server use following link:
[https://discord.com/api/oauth2/authorize?client_id=753345973991899197&permissions=67584&scope=bot](https://discord.com/api/oauth2/authorize?client_id=753345973991899197&permissions=67584&scope=bot)

If you want to set up this bot on your own then follow the next steps:
To use this script you need `python-3.x`. Then you need to install requirements and create a `token.json`.
Also you will need a `items.csv` file in [db](./db/) folder containing all items which can be generated using this tool [pf2eq_scape](https://github.com/wolframowy/pf2eq_scrape)
or at least have following data structure:

|              ID           |   Title   |    Level   |   Rarity    |      Price       |   Traits    |      Link       |
|:-------------------------:|:---------:|:----------:|:-----------:|:----------------:|:-----------:|:---------------:|
| ID on pathfinder prd page | Item name | Item level | Item rarity | Item price in GP | Item traits | Link to pf2 prd |


To run the bot use following commands. Remember that you also need to invite the bot into your discord server.
```shell
pip install req.txt
py bot.py
```

### Initial Configuration

To run this bot you require your discord bot token placed in `token.json` file in the same folder as `bot.py` is.
It should look like that:

```json
{
    "token": "-----YOUR_TOKEN_GOES_HERE-----"
}
```

### Usage

This bot have following commands:
```
-p2lg -h - display bot help

-p2lg -p party_level party_size [-r rarity] - generate whole level worth of loot for party of given level and size
    party_level - INTEGER: average level of party
    party_size - INTEGER: number of PCs in party
    rarity - OPTIONAL CHARACTER: Rarity up to which the items will be generated, "c" - Common, "u" - Uncommon, "r" - Rare (Default)

-p2lg -i item_level number_of_items [-r rarity] [-t type] - generate given number of items of given level
    item_level - INTEGER: level of items to be generated
    number_of_items - INTEGER: number of items to be generated
    rarity - OPTIONAL CHARACTER: rarity of generated items, "c" - Common (Default), "u" - Uncommon, "r" - Rare'
    type - OPTIONAL CHARACTER: type of items to be generated, "p" - Permanent (Default), "c" - Consumable
```

## Licensing

The code in this project is licensed under GNU GENERAL PUBLIC LICENSE license.