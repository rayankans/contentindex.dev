import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { saveArticle, deleteArticle } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    justifyContent: 'left',
    width: '100%',
    height: '10rem',
  },
  actionarea: {
    display: 'flex',
    flex: '9 1 auto',
    justifyContent: 'left',
  },
  media: {
    flex: '0 0 10rem',
    height: '10rem',
  },
  metadata: {
    flex: '1 1 auto',
  },
  actions: {
    flex: '1',
    verticalAlign: 'bottom',
  },
}));

/** @enum {string} */
const SaveState = {
  CAN_SAVE: 'can_save',
  PROGRESS: 'progress',
  SAVED: 'saved',
};

async function handleClick(article, saveState, setSaveState, dispatch) {
  if (saveState === SaveState.CAN_SAVE)
    saveContent(article, setSaveState, dispatch);
  else if (saveState === SaveState.SAVED)
    deleteContent(article, setSaveState, dispatch);
}

async function saveContent(article, setSaveState, dispatch) {
  setSaveState(SaveState.PROGRESS);
  await new Promise(r => setTimeout(r, 500));
  try {
    const response = await fetch(article.url, { mode: 'no-cors' });
    const cache = await caches.open('content');
    await cache.put(article.url, response);

    // Key by the URL which is unique.
    // TODO: Move this to IndexedDB.
    localStorage.setItem(article.url, JSON.stringify(article));
    dispatch(saveArticle(article));
    setSaveState(SaveState.SAVED);
  } catch (e) {
    setSaveState(SaveState.CAN_SAVE);
  }
}

async function deleteContent(article, setSaveState, dispatch) {
  setSaveState(SaveState.PROGRESS);

  try {
    await new Promise(r => setTimeout(r, 500));
    const cache = await caches.open('content');
    await cache.delete(article.url);
    localStorage.removeItem(article.url);
    dispatch(deleteArticle(article));
    setSaveState(SaveState.CAN_SAVE);
  } catch (e) {
    setSaveState(SaveState.SAVED);
  }
}

function ContentCard(props) {
  const classes = useStyles();

  const isSaved = props.savedArticles.map(a => a.url).includes(props.article.url);
  const [saveState, setSaveState] = React.useState(isSaved ? SaveState.SAVED : SaveState.CAN_SAVE);

  const getButtonIcon = () => {
    if (saveState === SaveState.PROGRESS)
      return <CircularProgress size={30} />;
    if (isSaved)
      return <CheckIcon />;
    return <AddIcon />;
  };

  return (
    <Card className={classes.card}>
      <CardActionArea 
          className={classes.actionarea}
          onClick={() => window.open(props.article.permalink, '_blank')}
      >
        <CardMedia
          className={classes.media}
          image={props.article.thumbnail}
          title={props.article.title}
        />
        <CardContent className={classes.metadata}>
          <Typography variant="h5" component="h2">
            {props.article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions} disableSpacing>
        <Button 
            size="large" color="primary"
            style={{ backgroundColor: 'transparent' }}
            onClick={() => handleClick(props.article, saveState, setSaveState, props.dispatch)}
        >
          {getButtonIcon()}
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(state => ({savedArticles: state.savedArticles}))(ContentCard);
