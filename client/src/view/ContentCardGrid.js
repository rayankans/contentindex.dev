import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ContentCard from './ContentCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      paddingLeft: '10vw',
      paddingRight: '10vw',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '5vw',
      paddingRight: '5vw',
    },
  }
}));

export default function ContentCards(props) {
  const classes = useStyles();

  return (
  <Grid container className={classes.root} >
    <Grid item xs={12}>
      <Grid container justify="center" spacing={4}>
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
