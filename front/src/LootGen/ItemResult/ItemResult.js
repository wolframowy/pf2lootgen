import React from 'react';
import {itemArr} from '../commonPropTypes';
import {styled, Link, Paper, Grid, Typography} from '@mui/material';

const GridTitle = styled(Grid)(({theme}) => ({
  position: 'sticky',
  top: '-8px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.secondary,
}));

const TypographyTitleCell = styled(Typography)(({theme}) => ({
  color: theme.palette.primary.contrastText,
}));

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
        <GridTitle container
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
        </GridTitle>

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
