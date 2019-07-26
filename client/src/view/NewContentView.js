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

class NewContentView extends React.Component {
  async componentDidMount() {
    if (this.props.articles && this.props.articles.length)
      return;

    fetch('/api')
      .then(response => {
      if (response.status >= 400) {
        throw Error('Failed to Fetch');
      }
      return response.json();
    }).then(json => {
      this.props.dispatch(addArticles(json));
    }).catch(e => {
      this.setState({articles: null});
    });
  }

  render() {
    if (!this.props.articles) {
      return <FetchError />;
    } else if (!this.props.articles.length) {
      return <Loading />;
    } else {
      return <ContentCardGrid articles={this.props.articles} />
    }
  }
}

export default connect(state => ({articles: state.fetchedArticles}))(NewContentView);
