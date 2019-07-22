import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ContentCard from './ContentCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
  },
}));

export default function ContentCards(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const spacing = matches ? '200px' : theme.spacing(2);

  return (
  <Grid container className={classes.root} style={{ paddingLeft: spacing, paddingRight: spacing }} >
    <Grid item xs={12}>
      <Grid container justify="center" spacing={4}>
        {props.articles.map((article, i) => (
          <Grid key={i} item xs={12} lg={6} spacing={2}>
            <ContentCard article={article} isMd={matches}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
  );
};
