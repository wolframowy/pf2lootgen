import React from 'react';
import {itemArr} from '../commonPropTypes';
import {Paper, Grid, Typography} from '@mui/material';
import GridTitleMain, {GridRow} from './Components/CustomGrid';
import TypographyTitleCell from './Components/TypographyTitleCell';
import LinkWithIframe from './Components/LinkWithIframe/LinkWithIframe';

/**
 * @param {*} props
 * @return {object} ItemResults container
 */
function ItemResult(props) {
  const {items} = props;

  return (
    <Paper>
      <Grid
        container
        direction="row"
        rowSpacing={0}
        align="center"
      >
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
            <TypographyTitleCell>Price (Gp)</TypographyTitleCell>
          </Grid>
          <Grid item xs={2}>
            <TypographyTitleCell>Rarity</TypographyTitleCell>
          </Grid>
          <Grid item xs={4}>
            <TypographyTitleCell>Traits</TypographyTitleCell>
          </Grid>
        </GridTitleMain>

        {items.length > 0 &&
          items.map(
              (item) => (
                <GridRow item container key={item.id}>
                  <Grid item xs={1}>{item.count}x</Grid>
                  <Grid item xs={3} zeroMinWidth>
                    <Typography>
                      <LinkWithIframe item={item} />
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>{item.level}</Grid>
                  <Grid item xs={1}>{item.price}</Grid>
                  <Grid item xs={2}>{item.rarity}</Grid>
                  <Grid item xs={4}>
                    {item.trait_raw.length > 0 &&
                    item.trait_raw.map((v) => `${v}, `)}</Grid>
                </GridRow>))}
        <GridTitleMain container item xs={12}>
          <Grid align='start'
            item xs={12}
            sx={{height: '1rem'}}
          />
        </GridTitleMain>
      </Grid>
    </Paper>
  );
};

ItemResult.propTypes = {
  items: itemArr.isRequired,
};

export default ItemResult;
