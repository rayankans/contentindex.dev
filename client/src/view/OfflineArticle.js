import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      paddingLeft: '20vw',
      paddingRight: '20vw',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '10vw',
      paddingRight: '10vw',
    },
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  media: {
    width: '100%',
    maxHeight: '70vh',
    borderRadius: '5px',
  },
}));

function PhotoMedia(props) {
  const classes = useStyles();
  return <img alt="" src={`/content/${props.id}`} className={classes.media}/>;
}

function VideoMedia(props) {
  const classes = useStyles();
  return (
    <video controls className={classes.media}>
      <source src={`/content/${props.id}`} type="video/mp4" />
    </video>);
}

function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.title}>
        <Typography variant="h5" component="h2">
          {props.article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.article.description}
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardMedia>
          {props.article.type === 'photo'
              ? <PhotoMedia id={props.article.id} />
              : <VideoMedia id={props.article.id} />}
        </CardMedia>
      </CardActionArea>
      <CardActions>
        <Button 
            size="small" color="primary" disabled={!Boolean(props.article.permalink)}
            onClick={() => window.open(props.article.permalink, '_blank')}
        >
          Source
        </Button>
      </CardActions>
    </Card>
  );
}

export default function OfflineArticle(props) {
  const classes = useStyles();

  const id = props.match.params[0].endsWith('/')
      ? props.match.params[0].slice(0, -1)
      : props.match.params[0];
  const article = JSON.parse(localStorage.getItem(id));

  if (!article)
    return (<h1> 404 </h1>);

  return (
    <div className={classes.root}>
      <MediaCard article={article} />
    </div>);
}
