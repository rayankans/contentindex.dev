import React from 'react';
import { connect } from 'react-redux';
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
      <Typography variant="h2" style={{marginBottom: 20}}>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="subtitle1">
        No saved content.
      </Typography>
    </div>);
}

function SavedContentView(props) {
  if (!props.savedArticles.length) {
    return <Shrug />
  } else {
    return <ContentCardGrid articles={props.savedArticles} />
  }
}

export default connect(state => ({ savedArticles: state.savedArticles }))(SavedContentView);