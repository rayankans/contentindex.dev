import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

import { saveCustomContent } from '../storage/content_cache';
import { saveArticle } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  textArea: {
    marginTop: theme.spacing(2),
    width: '99%',
    fontSize: theme.typography.fontSize,
  },
  close: {
    padding: theme.spacing(0.5),
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function ContentInput({category}) {
  const classes = useStyles();
  const [error, setError] = React.useState(true);

  switch (category) {
    case 'homepage':
      return null;
    case 'article':
      return <TextareaAutosize id="content-input"
                className={classes.textArea} 
                rows={3} rowsMax={3} placeholder="Insert content here" />;
    case 'video':
    case 'audio':
      return (
      <Input
          id="content-file" type="file" error={error}
          inputProps={{accept: `${category}/*`}}
          onChange={e => setError(!Boolean(e.target.value))}
          className={classes.formControl} />);
    default:
        return null;
  }
}

async function onAdd(category, onClose, dispatch, showSnackbar) {
  const id = btoa(Math.random().toString().substr(2));

  const titleInput = document.getElementById('content-title');
  const title = titleInput.value || titleInput.placeholder;

  const descriptionInput = document.getElementById('content-description');
  const description = descriptionInput.value || descriptionInput.placeholder;

  const iconInput = document.getElementById('content-icon');
  const iconUrl = iconInput.value || iconInput.placeholder;

  let response = null;
  if (category === 'article') {
    const contentInput = document.getElementById('content-input');
    const content = contentInput.value || contentInput.placeholder;
    response = new Response(content);
  } else if (category === 'video' || category === 'audio') {
    const contentInput = document.getElementById('content-file');
    if (!contentInput.files.length)
      return;
    
    response = new Response(contentInput.files[0]);
  }

  const article = {
    id,
    title,
    description,
    type: category,
    url: null,
    thumbnail: iconUrl,
    permalink: null,
  };
  console.log(article);

  try {
    await saveCustomContent(article, response);
    dispatch(saveArticle(article.id));
  } catch (e) {
    showSnackbar('Failed to save - ' + e.message);
    return;
  }

  showSnackbar('Content saved!');
  onClose();
}

function FormSnackbar(props) {
  const classes = useStyles();

  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id" className={classes.message}>
            <InfoIcon className={classes.icon}/>
            {props.message}
          </span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />);
}

function AddCustomContentForm(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState('homepage');
  const [snackbar, setSnackbar] = React.useState({open: false, message: null});

  return (
    <>
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="add-content-title">
      <DialogTitle id="add-content-title">Add Custom Content</DialogTitle>
      <DialogContent>
        <TextField
          id="content-title"
          label="Title"
          placeholder="Custom Title"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="content-description"
          label="Description"
          placeholder="Custom Description"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="content-icon"
          label="Icon URL"
          placeholder="/favicon.png"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            input={<OutlinedInput labelWidth={70} />}
          >
            <MenuItem value={'homepage'}>Home Page</MenuItem>
            <MenuItem value={'article'}>Article</MenuItem>
            <MenuItem value={'video'}>Video</MenuItem>
            <MenuItem value={'audio'}>Audio</MenuItem>
          </Select>
        </FormControl>
        <ContentInput category={category} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
            onClick={ 
              () => onAdd(category, props.onClose, props.dispatch,
                          message => setSnackbar({ open: true, message }))}
            color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
    <FormSnackbar
        open={snackbar.open}
        message={snackbar.message}
        handleClose={() => setSnackbar({open: false, message: null})}
    />
    </>
  );
}

export default connect()(AddCustomContentForm);
