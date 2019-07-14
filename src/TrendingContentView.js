import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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

export default class TrendingContentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: props.focused,
      phase: Phase.LOADING,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({phase: Phase.FETCH_ERROR}), 3000);
  }

  render() {
    if (!this.state.focused) return;
    switch (this.state.phase) {
      case Phase.LOADING:
        return <Loading />;
      case Phase.FETCHED:
        return <h1> Fetched! </h1>;
      case Phase.FETCH_ERROR:
        return <FetchError />
      default:
        return <Loading />;
    }
  }
}
