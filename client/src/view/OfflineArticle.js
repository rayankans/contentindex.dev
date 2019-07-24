import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      paddingLeft: '10vw',
      paddingRight: '10vw',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '5vw',
      paddingRight: '5vw',
    },
  },
  media: {
    maxWidth: '100%',
    maxHeight: '70vh',
  },
}));

function PhotoMedia(props) {
  const classes = useStyles();
  return <img alt="" src={`${props.url}?cache`} className={classes.media}/>;
}

function VideoMedia(props) {
  const classes = useStyles();

  return (
  <video controls className={classes.media}>
    <source src={`${props.url}?cache`} type="video/mp4" />
  </video>);
}

export default function OfflineArticle(props) {
  const classes = useStyles();

  const id = props.match.params[0];
  const article = JSON.parse(localStorage.getItem(id));
  if (!article)
    return (<h1> 404 </h1>);

  return (
    <div className={classes.root}>
      <h1> {article.title} </h1>
      <h3> {article.description} </h3>
      {article.type === 'video' ? <VideoMedia url={article.url} /> : <PhotoMedia url={article.url} />}
    </div>);
}
