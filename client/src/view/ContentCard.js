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

import { storeContent, clearContent } from '../storage/content_cache.js';
import { saveArticle, deleteArticle } from '../redux/actions.js';

/** @enum {string} */
const SaveState = {
  CAN_SAVE: 'can_save',
  PROGRESS: 'progress',
  SAVED: 'saved',
};

const imageDimension = '10vh';
const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionarea: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'left',
    paddingLeft: theme.spacing(2),
  },
  addButton: {
    flex: '0 0 auto',
  },
  media: {
    flex: `0 0 ${imageDimension}`,
    height: imageDimension,
    borderRadius: '5px',
  },
  metadata: {
    flex: '1 1 auto',
    height: imageDimension,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    flex: '1 0 6vh',
    overflow: 'hidden',
    lineHeight: 1.2,
    [theme.breakpoints.up('md')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em',
    },
  },
  description: {
    flex: '1 0 auto',
    overflow: 'hidden',
    lineHeight: 1.2,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.3em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    },
  },
}));

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
    await storeContent(article);
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
    await clearContent(article);
    dispatch(deleteArticle(article.id));
    setSaveState(SaveState.CAN_SAVE);
  } catch (e) {
    console.log(e);
    setSaveState(SaveState.SAVED);
  }
}

function ContentCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isSaved = props.savedArticleIds.includes(props.article.id);
  const [saveState, setSaveState] = React.useState(isSaved ? SaveState.SAVED : SaveState.CAN_SAVE);

  const getButtonIcon = () => {
    if (saveState === SaveState.PROGRESS)
      return <CircularProgress fontSize="large" />;
    if (isSaved)
      return <CheckIcon fontSize="large" />;
    return <AddIcon fontSize="large" />;
  };

  return (
    <Card className={classes.card}>
      <CardActionArea 
          className={classes.actionarea}
          onClick={() => isSaved ? window.location.href = `/article/${props.article.id}`
                                 : window.open(props.article.permalink, '_blank')}
      >
        <CardMedia
          className={classes.media}
          image={window.location.pathname === '/saved' && isSaved
                    ? `/icon/${props.article.id}`
                    : props.article.thumbnail}
          title={props.article.title}
        />
        <CardContent className={classes.metadata}>
          <Typography variant="h6" className={classes.title}>
            {props.article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {props.article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.addButton} disableSpacing>
          <Button 
              color="primary"
              style={{ backgroundColor: 'transparent', padding: theme.spacing(1), minWidth: 0 }}
              onClick={() => handleClick(props.article, saveState, setSaveState, props.dispatch)}
          >
            {getButtonIcon()}
          </Button>
      </CardActions>
    </Card>
  );
}

export default connect(state => ({savedArticleIds: state.savedArticleIds}))(ContentCard);
