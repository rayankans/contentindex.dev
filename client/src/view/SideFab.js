import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from '@material-ui/core/Zoom';
import AddCustomContentForm from './AddCustomContentForm';
import { addArticles, deleteArticle } from '../redux/actions';
import { clearAll } from '../storage/content_cache';

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
    bottom: theme.spacing(25),
    right: theme.spacing(5),
  },
  fabDelete: {
    position: 'fixed',
    bottom: theme.spacing(19),
    right: theme.spacing(5),
  },
  fabAdd: {
    position: 'fixed',
    bottom: theme.spacing(13),
    right: theme.spacing(5),
  },
}));

function SideFab(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [more, setMore] = React.useState(false);

  function handleAdd() {
    setMore(false);
    setOpen(true);
  }

  async function handleDelete(dispatch) {
    const allIds = await clearAll();
    allIds.forEach(id => dispatch(deleteArticle(id)));
    setMore(false);
  }

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
              setMore(false);
              props.dispatch(addArticles([]));
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }}
        >
          <RefreshIcon />
        </Fab>
      </Zoom>

      <Zoom
        key='delete'
        in={more}
        unmountOnExit
      >
        <Fab 
            aria-label="Delete"
            className={classes.fabDelete}
            size="small"
            onClick={() => handleDelete(props.dispatch)}
        >
          <DeleteIcon />
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
            onClick={handleAdd}
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
  
      <AddCustomContentForm open={open} onClose={()=>setOpen(false)}/>
    </>
  );
}

export default connect()(SideFab);
