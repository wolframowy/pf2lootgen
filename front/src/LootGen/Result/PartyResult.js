import React from 'react';
import PropTypes from 'prop-types';
import {itemArr} from '../commonPropTypes';
import {Paper, Link, Typography, Box, Grid} from '@mui/material';
import GridTitleMain, {GridTitleMainLight} from './Components/GridTitle';
import TypographyTitleCell from './Components/TypographyTitleCell';


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
              <React.Fragment key={item.ID}>
                <Grid item xs={1}>{item.count}x</Grid>
                <Grid item xs={3} zeroMinWidth>
                  <Typography>
                    <Link href={item.URL} target='_blank'>
                      {item.Title}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={1}>{item.Lvl}</Grid>
                <Grid item xs={1}>{item.Price}</Grid>
                <Grid item xs={2}>{item.Rarity}</Grid>
                <Grid item xs={4}>
                  {item.Traits.length > 0 &&
                  item.Traits.map((v) => `${v}, `)}</Grid>
              </React.Fragment>))}
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
        rowSpacing={1}
        justifyContent='center'
        alignItems='center'
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
