import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Zoom from '@material-ui/core/Zoom';
import AddCustomContentForm from './AddCustomContentForm';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default function AddContentButton(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Zoom
        key='primary'
        in
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Add" className={classes.fab} color="primary" size="large" onClick={handleClick}>
          <AddIcon />
        </Fab>
      </Zoom>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <AddCustomContentForm />
      </Popover>
    </>
  );
}