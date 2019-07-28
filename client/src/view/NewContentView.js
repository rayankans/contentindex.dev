import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { addArticles } from '../redux/actions';
import ContentCardGrid from './ContentCardGrid';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(8),
  },
  shrug: {
    margin: theme.spacing(8),
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <CircularProgress className={classes.progress} />
  );
}

function FetchError() {
  const classes = useStyles();

  function ErrorReason() {
    if (!navigator.onLine) {
      return (
        <Typography variant="subtitle1">
          You are offline.
        </Typography>
      );
    }

    return (
      <Typography variant="subtitle1">
        Failed to fetch content.
      </Typography>
    );
  }

  return (
    <div style={{textAlign: 'center'}}>
      <Typography variant="h2" className={classes.shrug}>
        ¯\_(ツ)_/¯
      </Typography>
      <ErrorReason />
    </div>
  )
}

function NewContentView(props) {
  function fetchArticles() {
    fetch('/api')
      .then(response => {
      if (response.status >= 400) {
        throw Error('Failed to Fetch');
      }
      return response.json();
    }).then(json => {
      props.dispatch(addArticles(json));
    }).catch(e => {
      props.dispatch(addArticles(null));
    });
  }

  if (!props.articles) {
    return <FetchError />;
  } else if (!props.articles.length) {
    fetchArticles();
    return <Loading />;
  } else {
    return <ContentCardGrid articles={props.articles} />
  }
}

export default connect(state => ({articles: state.fetchedArticles}))(NewContentView);
