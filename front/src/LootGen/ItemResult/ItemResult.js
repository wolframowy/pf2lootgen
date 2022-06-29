import React from 'react';
import {itemArr} from '../commonPropTypes';
import {Link, Paper, Grid, Typography} from '@mui/material';

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
        <Grid item xs={1}>
          <Typography>Count</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Level</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Price</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Rarity</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Traits</Typography>
        </Grid>

        {items.length > 0 &&
          items.map(
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
      </Grid>
    </Paper>
  );
};

ItemResult.propTypes = {
  items: itemArr.isRequired,
};

export default ItemResult;
