import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ContentCardGrid from './ContentCardGrid';

const useStyles = makeStyles(theme => ({
  shrug: {
    margin: theme.spacing(8),
  },
}));

function Shrug() {
  const classes = useStyles();

  return (
    <div style={{textAlign: 'center'}}>
      <Typography variant="h1" className={classes.shrug}>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="subtitle1">
        No saved content.
      </Typography>
    </div>);
}

export default class SavedContentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({selected: this.props.selected});
    }
  }

  render() {
    const articles = [];
    for (let i = 0; i < localStorage.length; i++) {
      articles.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    if (!articles.length) {
      return <Shrug />
    } else {
      return <ContentCardGrid articles={articles} />
    }
  }
}
