import React from 'react';
import PropTypes from 'prop-types';
import {itemArr} from '../commonPropTypes';
import {Paper, Typography, Grid} from '@mui/material';
import GridTitleMain, {
  GridTitleMainLight,
  GridRow} from './Components/CustomGrid';
import TypographyTitleCell from './Components/TypographyTitleCell';
import LinkWithIframe from './Components/LinkWithIframe/LinkWithIframe';


const itemSection = (sectionName, items) => (
  <>
    {items.length > 0 && (
      <>
        <GridTitleMainLight align='start'
          item xs={12}>
          <TypographyTitleCell ml={2}>{sectionName}</TypographyTitleCell>
        </GridTitleMainLight>
        {items.map(
            (item) => (
              <GridRow item container xs={12}
                key={item.id}>
                <Grid item xs={1}>{item.count}x</Grid>
                <Grid item xs={3} zeroMinWidth>
                  <Typography component={'span'}>
                    <LinkWithIframe item={item} />
                  </Typography>
                </Grid>
                <Grid item xs={1}>{item.level}</Grid>
                <Grid item xs={1}>{item.price}</Grid>
                <Grid item xs={2}>{item.rarity}</Grid>
                <Grid item xs={4}>
                  {item.trait_raw.length > 0 &&
                  item.trait_raw.map((v) => `${v}, `)}
                </Grid>
              </GridRow>))}
      </>
    )}
  </>
);

/**
 * @param {*} props
 * @return {object} PartyResult container
 */
function PartyResult(props) {
  const {consumable, perm, currency} = props;

  return (
    <Paper>
      <Grid
        container
        direction='row'
        rowSpacing={0}
        align='center'>
        <GridTitleMain container
          item xs={12}>
          <Grid item xs={1}>
            <TypographyTitleCell>Count</TypographyTitleCell>
          </Grid>
          <Grid item xs={3}>
            <TypographyTitleCell>Name</TypographyTitleCell>
          </Grid>
          <Grid item xs={1}>
            <TypographyTitleCell>Level</TypographyTitleCell>
          </Grid>
          <Grid item xs={1}>
            <TypographyTitleCell>Price</TypographyTitleCell>
          </Grid>
          <Grid item xs={2}>
            <TypographyTitleCell>Rarity</TypographyTitleCell>
          </Grid>
          <Grid item xs={4}>
            <TypographyTitleCell>Traits</TypographyTitleCell>
          </Grid>
        </GridTitleMain>
        {itemSection('Permanent Items:', perm)}
        {itemSection('Consumable Items:', consumable)}
      </Grid>
      {currency > 0 && (
        <>
          <GridTitleMainLight align='start'
            item xs={12}>
            <TypographyTitleCell ml={2}>Total Currency:</TypographyTitleCell>
          </GridTitleMainLight>
          <Grid align='start'
            item xs={12}>
            <Typography ml={2} fontWeight='bold'>
              {currency} Gold Pieces
            </Typography>
          </Grid>
        </>
      )}
    </Paper>
  );
};

PartyResult.propTypes = {
  consumable: itemArr.isRequired,
  perm: itemArr.isRequired,
  currency: PropTypes.number.isRequired,
};

export default PartyResult;
