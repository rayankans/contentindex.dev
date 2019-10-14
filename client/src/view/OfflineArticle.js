import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import * as idb from 'idb-keyval';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
    maxWidth: '90%',
    maxHeight: '70vh',
    borderRadius: '5px',
  },
}));

function PhotoMedia(props) {
  const classes = useStyles();
  return <img alt="" src={props.src} className={classes.media}/>;
}

function VideoMedia(props) {
  const classes = useStyles();
  return (
    <video controls className={classes.media}>
      <source src={props.src} type="video/mp4" />
    </video>);
}

function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.title}>
        <Typography variant="h5" component="h2">
          {props.article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.article.description}
        </Typography>
      </CardContent>
      <CardMedia>
        {props.article.type === 'photo'
            ? <PhotoMedia src={`/content/${props.article.id}`} />
            : <VideoMedia src={`/content/${props.article.id}`} />}
      </CardMedia>
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

function Error() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.shrug}>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="subtitle1">
        Something went wrong.
      </Typography>
    </div>
  );
}

function ArticleCard(props) {
  const classes = useStyles();

  const [text, setText] = React.useState('');

  caches.open('content')
    .then(cache => cache.match(`/content/${props.article.id}`))
    .then(response => response.text())
    .then(text => setText(text))
    .catch(() => setText(null));

  if (text === null) {
    return <Error />;
  }

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
      <CardMedia>
         <img alt="" width={256} height={256} src={`/icon/${props.article.id}`} style={{borderRadius: '5px'}} />
      </CardMedia>
      <CardContent style={{textAlign: 'left'}}>
        {text.split('\n').map((line, i) =>  <Typography paragraph key={i}> {line} </Typography>)}
      </CardContent>
    </Card>
  );
}

function OfflineArticle(props) {
  const classes = useStyles();

  const id = props.match.params[0].endsWith('/')
      ? props.match.params[0].slice(0, -1)
      : props.match.params[0];

  const [article, setArticle] = React.useState('loading');
  React.useEffect(() => {
    (async () => {
      const serArticle = await idb.get(id);
      if (serArticle)
        setArticle(JSON.parse(serArticle));
      else setArticle(null);
    })();
  }, [id]);

  if (article === 'loading') {
    return <></>;
  }

  if (!article) {
    return <Error />;
  }

  if (article.type === 'homepage') {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      {['photo', 'video'].includes(article.type) && <MediaCard article={article} />}
      {['article'].includes(article.type) && <ArticleCard article={article} />}
    </div>);
}

export default withRouter(OfflineArticle);
