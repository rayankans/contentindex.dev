import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ContentCardGrid from './ContentCardGrid';

const useStyles = makeStyles(theme => ({
  shrug: {
    margin: theme.spacing(8),
    textAlign: 'center',
  },
}));

function Shrug() {
  const classes = useStyles();

  return (
    <div className={classes.shrug}>
      <Typography variant="h2" style={{marginBottom: 20}} noWrap>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="subtitle1">
        No saved content.
      </Typography>
    </div>);
}

export default function SavedContentView(props) {
  const articles = [];
  for (let i = 0; i < localStorage.length; i++)
    articles.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

  if (!articles.length) {
    return <Shrug />
  } else {
    return <ContentCardGrid articles={articles} />
  }
}
