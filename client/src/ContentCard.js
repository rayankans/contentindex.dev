import React from 'react';
import { makeStyles } from '@material-ui/styles';
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

const useStyles = makeStyles({
  card: {
    display: 'flex',
    justifyContent: 'left',
    width: 600,
    height: 150,
  },
  actionarea: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'left',
  },
  media: {
    flex: '0 0 150px',
    height: 150,
  },
  metadata: {
    flex: '1 1 auto',
  },
  actions: {
    flex: '0 1 auto',
    verticalAlign: 'bottom',
  },
});

/**
 * @enum {string}
 */
const SaveState = {
  CAN_SAVE: 'can_save',
  PROGRESS: 'progress',
  SAVED: 'saved',
};

function handleClick(article, saveState, setSaveState) {
  if (saveState === SaveState.CAN_SAVE)
    saveContent(article, setSaveState);
  else if (saveState === SaveState.SAVED)
    deleteContent(article, setSaveState);
}

async function saveContent(article, setSaveState) {
  setSaveState(SaveState.PROGRESS);

  try {
    const response = await fetch(article.url, { mode: 'no-cors' });
    const cache = await caches.open('content');
    await cache.put(article.url, response);

    // Key by the URL which is unique.
    // TODO: Move this to IndexedDB.
    localStorage.setItem(article.url, JSON.stringify(article));
    setSaveState(SaveState.SAVED);
  } catch (e) {
    setSaveState(SaveState.CAN_SAVE);
  }
}

async function deleteContent(article, setSaveState) {
  setSaveState(SaveState.PROGRESS);
  try {
    const cache = await caches.open('content');
    await cache.delete(article.url);
    localStorage.removeItem(article.url);
    setSaveState(SaveState.CAN_SAVE);
  } catch (e) {
    setSaveState(SaveState.SAVED);
  }
}

export default function ContentCard(props) {
  const classes = useStyles();

  // Check local storage to see if this was already cached.
  let initialState = SaveState.CAN_SAVE;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === props.article.url) {
      initialState = SaveState.SAVED;
      break;
    }
  }
  const [saveState, setSaveState] = React.useState(initialState);

  const getButtonIcon = () => {
    switch (saveState) {
      case SaveState.CAN_SAVE:
        return <AddIcon />;
      case SaveState.PROGRESS:
        return <CircularProgress size={30} />;
      case SaveState.SAVED:
        return <CheckIcon />;
      default:
        return null;
    }
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
            onClick={() => handleClick(props.article, saveState, setSaveState)}
        >
          {getButtonIcon()}
        </Button>
      </CardActions>
    </Card>
  );
}
