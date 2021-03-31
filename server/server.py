from flask import Flask, jsonify, request
from flask_cors import CORS

from loot_gen import LootGen, Rarity, ItemType


# configuration
DEBUG = False

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# create LootGen
loot_gen = LootGen()

RARITY_MAP = {
    'c': Rarity.COMMON,
    'u': Rarity.UNCOMMON,
    'r': Rarity.RARE
}

ITEM_TYPE_MAP = {
    'p': ItemType.PERMANENT,
    'c': ItemType.CONSUMABLE
}


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/party/<int:pt_lvl>/<int:pt_size>', methods=['GET'])
def party(pt_lvl: int, pt_size: int):
    r_perm, r_cons, curr = loot_gen.generate_loot_for_player_level(pt_lvl=pt_lvl, pt_size=pt_size)
    ret = {
        'perm': r_perm,
        'consumable': r_cons,
        'currency': curr
    }
    return jsonify(ret)


@app.route('/party/<int:pt_lvl>/<int:pt_size>/<string:rarity>', methods=['GET'])
def party_rarity(pt_lvl: int, pt_size: int, rarity: str):
    if rarity in RARITY_MAP:
        r_perm, r_cons, curr = loot_gen.generate_loot_for_player_level(pt_lvl=pt_lvl, pt_size=pt_size,
                                                                       rarity=RARITY_MAP[rarity])
    else:
        r_perm, r_cons, curr = loot_gen.generate_loot_for_player_level(pt_lvl=pt_lvl, pt_size=pt_size,
                                                                       rarity=RARITY_MAP['r'])
    ret = {
        'perm': r_perm,
        'consumable': r_cons,
        'currency': curr
    }
    return jsonify(ret)


@app.route('/item/<int:ilvl>/<int:item_no>')
def item(ilvl: int, item_no: int):
    rarity_param = request.args.get("r")
    item_type_param = request.args.get("t")
    rarity = RARITY_MAP[rarity_param] if rarity_param in RARITY_MAP else None
    item_type = ITEM_TYPE_MAP[item_type_param] if item_type_param in ITEM_TYPE_MAP else None
    ret = loot_gen.generate_items_of_level(ilvl=ilvl, n=item_no, rarity=rarity, item_type=item_type)
    return jsonify(ret)


if __name__ == '__main__':
    app.run()
