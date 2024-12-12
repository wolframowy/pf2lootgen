# pf2lootgen
> Tags: Pathfinder 2e pf2 item equipment generator

## Application

Application is currently available at
[http://pokierejszowany.mooo.com](http://pokierejszowany.mooo.com/) 
and
[http://pokierejszowany.farted.net/](http://pokierejszowany.farted.net/).

## About

Loot generator for pathfinder 2nd edition. It has two modes: `party` and `items`. 

`party` mode generates items for current party level with adjustments for additional PCs.
`items` mode generates given number of items of selected level.

Currently there are couple of subprojects:
- [generator](#generator)
- [backend](#backend)
- [frontend](#frontend)
- [discord bot](#discord-bot)

This tool uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy ([paizo.com/communityuse](https://paizo.com/community/communityuse)). We are expressly prohibited from charging you to use or access this content. This tool is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit paizo.com.

## Source data

To use this tool you will need a `items.json` file in [db](./db/) folder containing all items which can be generated or updated using CURL script located at [curl_data_query.txt](./db/curl_data_query.txt).

## Generator

[loot_gen.py](./python/loot_gen.py) is the main file responsible for generating loot based on parameters from the items.json file. To see how to use this tool simply ask for the help by using 
```
py loot_gen.py -h
```

## Backend

Backend is built using the Flask framework and it simply encompasses the [loot_gen.py](./python/loot_gen.py) into api endpoints. See [server.py](./python/server.py) for list of endpoints.

### Installation / Getting started

You will need an `items.json` file (see [Source data](#source-data)).

There's a dockerfile located in docker folder so you can run it using the following command:
```docker
docker build -t pf2backend -f .\docker\back\dockerfile .
docker run -d -p 5000:5000 pf2backend
```

If you want to set up backend server on your own then follow the next steps:
To use this script you need `python-3.x`. Then you need to install requirements located at [req_server.txt](./python/req_server.txt).

## Frontend

For frontend app to work you'll need to have a running backend application.

Frontend is a one-page react application that communicates with backend and displays the data. First specify the backend server address in the [config.json](./front/src/config/config.json) file. To run simply run the 
```
npm install
npm start
```

Frontend is also dockerized so you can run following commands from the root folder
```docker
docker build --build-arg REACT_APP_SERVER_URL=[server_url] -t pf2frontend -f .\docker\front\dockerfile .
docker run -d -p 3000:3000 pf2frontend
```

## Discord bot

### Installing / Getting started

If you want to set up this bot on your own then follow the next steps:
To use this script you need `python-3.x`. Then you need to install requirements and create a `token.json`.
Also you will need a `items.csv` file in [db](./db/) folder containing all items which can be generated using CURL script located at [curl_data_query.txt](./db/curl_data_query.txt).

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