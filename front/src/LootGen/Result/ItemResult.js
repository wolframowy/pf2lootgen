import React from 'react';
import {itemArr} from '../commonPropTypes';
import {Link, Paper, Grid, Typography} from '@mui/material';
import GridTitleMain, {GridRow} from './Components/CustomGrid';
import TypographyTitleCell from './Components/TypographyTitleCell';

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
        rowSpacing={1}
        justifyContent="center"
        alignItems="center"
        align="center">
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

        {items.length > 0 &&
          items.map(
              (item) => (
                <GridRow item container key={item.ID}>
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
                </GridRow>))}
      </Grid>
    </Paper>
  );
};

ItemResult.propTypes = {
  items: itemArr.isRequired,
};

export default ItemResult;
