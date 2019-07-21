import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function AddCustomContentForm() {
  const classes = useStyles();

  return (
    <Typography class={classes.typography}>
      TODO: create content form.
    </Typography>);
}