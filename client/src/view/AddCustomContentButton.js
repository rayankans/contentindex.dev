import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover from '@material-ui/core/Popover';
import RefreshIcon from '@material-ui/icons/Refresh';
import Zoom from '@material-ui/core/Zoom';
import AddCustomContentForm from './AddCustomContentForm';
import { addArticles } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  fabMore: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  fabMoreClick: {
    transform: 'rotate(90deg)',
  },
  fabRefresh: {
    position: 'fixed',
    bottom: theme.spacing(18),
    right: theme.spacing(5),
  },
  fabAdd: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(5),
  },
}));

function AddContentButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [more, setMore] = React.useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Zoom
        key='refresh'
        in={more && props.showRefresh}
        unmountOnExit
      >
        <Fab 
            aria-label="Refresh" className={classes.fabRefresh} size="small"
            onClick={() => {
              props.dispatch(addArticles([]));
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }}
        >
          <RefreshIcon />
        </Fab>
      </Zoom>
  
      <Zoom
        key='add'
        in={more}
        unmountOnExit
      >
        <Fab 
            aria-label="Add"
            className={classes.fabAdd}
            size="small"
            color="secondary"
            onClick={handleClick}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      <Fab 
          aria-label="More"
          className={more ? `${classes.fabMore} ${classes.fabMoreClick}` : classes.fabMore}
          color="primary" size="large" 
          onClick={() => setMore(!more)}
      >
        <MoreHorizIcon />
      </Fab>
  
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

export default connect()(AddContentButton);
