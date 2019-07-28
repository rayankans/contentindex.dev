import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

export default function AddCustomContentForm(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState('homepage');

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="add-content-title">
      <DialogTitle id="add-content-title">Add Custom Content</DialogTitle>
      <DialogContent>
        <TextField
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
