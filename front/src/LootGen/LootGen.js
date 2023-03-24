import './LootGen.scss';
import FilterParty from './Filter/FilterParty';
import FilterItem from './Filter/FilterItem';
import React, {useState} from 'react';
import {styled, Box, Button, ButtonGroup} from '@mui/material';
import config from './../config/config.json';
import ItemResult from './Result/ItemResult';
import PartyResult from './Result/PartyResult';

const BoxWithScrollbar = styled(Box)(({theme}) => ({
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  /* Track */
  '&::-webkit-scrollbar-track': {
    background: theme.palette.secondary.main,
    borderRadius: '2px',
  },
  /* Handle */
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.light,
    borderRadius: '2px',
  },
  /* Handle on hover */
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.primary.main,
  },
}));

/**
 * LootGen container
 * @return {object} LootGen container
 */
function LootGen() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL ?
  process.env.REACT_APP_SERVER_URL :
  config.SERVER_URL;

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
    fetch(SERVER_URL + '/party/' + plvl + '/' + size + '?r=' + rarity)
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
    fetch(SERVER_URL + '/item/' + ilvl + '/' + count +
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
      <BoxWithScrollbar className='results' my={1} mx={4}>
        {modeParty ?
          <PartyResult
            consumable={party.consumable}
            perm={party.perm}
            currency={party.currency} /> :
          <ItemResult items={items} />}
      </BoxWithScrollbar>
    </Box>
  );
}

export default LootGen;
