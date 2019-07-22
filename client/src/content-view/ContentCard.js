import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { saveArticle, deleteArticle } from '../redux/actions';

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
  await new Promise(r => setTimeout(r, 50));
  setSaveState(SaveState.PROGRESS);
  
  try {
    await new Promise(r => setTimeout(r, 500));
    const response = await fetch(article.url, { mode: 'no-cors' });
    const cache = await caches.open('content');
    await cache.put(article.url, response);

    // Key by the URL which is unique.
    // TODO: Move this to IndexedDB.
    localStorage.setItem(article.id, JSON.stringify(article));
    dispatch(saveArticle(article.id));
    setSaveState(SaveState.SAVED);
  } catch (e) {
    console.log(e);
    setSaveState(SaveState.CAN_SAVE);
  }
}

async function deleteContent(article, setSaveState, dispatch) {
  await new Promise(r => setTimeout(r, 50));
  setSaveState(SaveState.PROGRESS);

  try {
    await new Promise(r => setTimeout(r, 500));
    const cache = await caches.open('content');
    await cache.delete(article.url);
    localStorage.removeItem(article.id);
    dispatch(deleteArticle(article.id));
    setSaveState(SaveState.CAN_SAVE);
  } catch (e) {
    console.log(e);
    setSaveState(SaveState.SAVED);
  }
}

function ContentCard(props) {
  const theme = useTheme();
  const imageDimension = useMediaQuery(theme.breakpoints.up('md')) ? '10vw' : '25vw';

  const classes = makeStyles(theme => ({
    card: {
      position: 'relative',
      width: '100%',
      height: imageDimension,
    },
    actionarea: {
      display: 'flex',
      justifyContent: 'left',
      width: '100%',
      height: '100%',
    },
    media: {
      flex: `0 0 ${imageDimension}`,
      height: imageDimension,
      padding: theme.spacing(2),
    },
    metadata: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      flex: '1 1 auto',
      height: imageDimension,
      padding: theme.spacing(2),
    },
    actions: {
      position: 'absolute',
      padding: theme.spacing(0),
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
  }))();

  const isSaved = props.savedArticleIds.includes(props.article.id);
  const [saveState, setSaveState] = React.useState(isSaved ? SaveState.SAVED : SaveState.CAN_SAVE);

  const getButtonIcon = () => {
    if (saveState === SaveState.PROGRESS)
      return <CircularProgress size={30} />;
    if (isSaved)
      return <CheckIcon />;
    return <AddIcon />;
  };

  const fontSize = props.isMd ? '1.8rem' : '1.2rem';
  return (
    <Card className={classes.card}>
      <CardActionArea 
          className={classes.actionarea}
          onClick={() => window.open(isSaved ? `/article/${props.article.id}` : props.article.permalink, '_blank')}
      >
        <CardMedia
          className={classes.media}
          image={props.article.thumbnail}
          title={props.article.title}
        />
        <CardContent className={classes.metadata}>
          <Typography 
              variant="h1"
              style={{fontSize, paddingBottom: theme.spacing(1)}}>
            {props.article.title}
          </Typography>
          <Typography 
              variant="body2" color="textSecondary" component="p"
              style={{fontSize: '0.8rem', paddingRight: theme.spacing(2)}}
            >
            {props.article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions} disableSpacing>
        <Button 
            color="primary"
            style={{ backgroundColor: 'transparent', padding: 0, minWidth: 0 }}
            onClick={() => handleClick(props.article, saveState, setSaveState, props.dispatch)}
        >
          {getButtonIcon()}
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(state => ({savedArticleIds: state.savedArticleIds}))(ContentCard);
