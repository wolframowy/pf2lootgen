import './LootGen.scss';
import FilterParty from './FilterParty/FilterParty';
import FilterItem from './FilterItem/FilterItem';
import React, {useState} from 'react';
import {Box, Button, ButtonGroup, Paper} from '@mui/material';
import config from './../config/config.json';
import ItemResult from './ItemResult/ItemResult';
import PartyResult from './PartyResult/PartyResult';

/**
 * LootGen container
 * @return {object} LootGen container
 */
function LootGen() {
  const [modeParty, setModeParty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [party, setParty] = useState({
    consumable: [],
    perm: [],
    currency: 0,
  });

  const [plvl, setPlvl] = useState(1);
  const [ilvl, setIlvl] = useState(1);
  const [size, setSize] = useState(4);
  const [rarity, setRarity] = useState('r');
  const [count, setCount] = useState(5);
  const [type, setType] = useState('p');

  const normalizeLevel = (lvl) => {
    return lvl > 20 ? 20 : (lvl < 1 ? 1 : parseInt(lvl));
  };

  const normalizeSize = (size) => {
    return size > 10 ? 10 : (size < 1 ? 1 : parseInt(size));
  };

  const normalizeCount = (count) => {
    return count > 50 ? 50 : (count < 1 ? 1 : parseInt(count));
  };

  const getPartyLoot = () => {
    setLoading(true);
    fetch(config.SERVER_URL + '/party/' + plvl + '/' + size + '?r=' + rarity)
        .then((res) => res.json())
        .then(
            (res) => {
              setParty(res);
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setParty({});
              alert(error);
            });
  };

  const getItemLoot = () => {
    setLoading(true);
    fetch(config.SERVER_URL + '/item/' + ilvl + '/' + count +
      '?r=' + rarity + '&t=' + type )
        .then((res) => res.json())
        .then(
            (res) => {
              setItems(res);
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setItems([]);
              alert(error);
            });
  };

  const handlePlvlChange = (e) => setPlvl(normalizeLevel(e.target.value));
  const handleIlvlChange = (e) => setIlvl(normalizeLevel(e.target.value));
  const handleSizeChange = (e) => setSize(normalizeSize(e.target.value));
  const handleCountChange = (e) => setCount(normalizeCount(e.target.value));
  const handleRarityChange = (event) => setRarity(event.target.value);
  const handleTypeChange = (e) => setType(e.target.value);

  const handleModeClick = (mode) => setModeParty(mode === 'p');

  const handleSearch = () => {
    modeParty ? getPartyLoot() : getItemLoot();
  };

  const partyProps = {
    lvl: plvl,
    handleLvlChange: handlePlvlChange,
    size, handleSizeChange,
    rarity, handleRarityChange};
  const itemProps = {
    lvl: ilvl,
    handleLvlChange: handleIlvlChange,
    count, handleCountChange,
    rarity, handleRarityChange,
    type, handleTypeChange};

  return (
    <Box className='LootGen'>
      <Box className='filter'>
        <ButtonGroup variant="contained" color="primary"
          aria-label="text primary button group">
          <Button color={modeParty ? 'primary' : 'secondary'}
            onClick={() => {
              handleModeClick('p');
            }}>
              Party
          </Button>
          <Button color={modeParty ? 'secondary' : 'primary'}
            onClick={() => {
              handleModeClick('i');
            }}>Item</Button>
        </ButtonGroup>
        <Box my={1}>
          {modeParty ?
            <FilterParty {...partyProps} /> :
            <FilterItem {...itemProps} />}
        </Box>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>
      <Box className='results'>
        <Paper >
          {modeParty ?
            <PartyResult
              consumable={party.consumable}
              perm={party.perm}
              currency={party.currency} /> :
            <ItemResult items={items} />}
        </Paper>
      </Box>
    </Box>
  );
}

export default LootGen;
