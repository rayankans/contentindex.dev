import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ContentCard from './ContentCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
}));

export default function ContentCards(props) {
  const classes = useStyles();

  return (
  <Grid container className={classes.root} spacing={4}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={8}>
        {props.articles.map((article, i) => (
          <Grid key={i} item xs={12} lg={6}>
            <ContentCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
  );
};
