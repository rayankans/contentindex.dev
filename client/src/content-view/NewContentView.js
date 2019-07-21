import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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
      <Typography variant="h1" className={classes.shrug}>
        ¯\_(ツ)_/¯
      </Typography>
      <ErrorReason />
    </div>
  )
}

/** @enum {string} */
const Phase = {
  LOADING: 'loading',
  FETCHED: 'fetched',
  FETCH_ERROR: 'fetcherror',
};

export default class NewContentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phase: Phase.LOADING,
      result: null,
    };
  }

  async componentDidMount() {
    fetch('/api')
      .then(response => {
      if (response.status >= 400) {
        throw Error('Failed to Fetch');
      }
      return response.json();
    }).then(json => {
      this.setState({result: json, phase: Phase.FETCHED});
    }).catch(e => {
      this.setState({phase: Phase.FETCH_ERROR});
    });
  }

  render() {
    switch (this.state.phase) {
      case Phase.LOADING:
        return <Loading />;
      case Phase.FETCHED:
        return <ContentCardGrid articles={this.state.result} />
      case Phase.FETCH_ERROR:
        return <FetchError />
      default:
        return <Loading />;
    }
  }
}
