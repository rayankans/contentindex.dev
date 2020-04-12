import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Home';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsOnIcon from '@material-ui/icons/Notifications';

import SubscriptionDialog from './view/SubscriptionDialog';
import { isPushSupported, isPushEnabled } from './storage/push_manager.js';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  homeButton: {
    margin: theme.spacing(0),
  },
  title: {
    flex: '0 0 auto',
    marginLeft: theme.spacing(2),
  },
  subtitle: {
    flex: '1 1 auto',
    marginLeft: theme.spacing(2),
  },
  iconButton: {
    margin: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  notificationButton: {
    margin: theme.spacing(0),
  },
}));

function GitHubIcon() {
  return (
  <SvgIcon>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </SvgIcon>);
}

function SpecIcon() {
  return(
  <SvgIcon>
    <path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </SvgIcon>);
}

function TopAppBar(props) {
  const classes = useStyles();

  const [hidePush, setHidePush] = React.useState(true);
  const [notifOn, setNotifOn] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  React.useEffect(() => {
    isPushSupported().then(supported => setHidePush(!supported));
  });

  React.useEffect(() => {
    isPushEnabled().then(enabled => setNotifOn(enabled));
  }, [notifOn]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
              edge="start" className={classes.menuButton} color="inherit" aria-label="Menu"
              onClick={() => props.history.push('/')}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Sad Chonks
          </Typography>
          <Typography variant="body2" className={classes.subtitle} noWrap>
            Content Index API
          </Typography>
          <IconButton 
              edge="end" className={classes.iconButton} color="inherit" aria-label="GitHub"
              onClick={() => window.open('https://github.com/wicg/content-index', '_blank')}
          >
            <SpecIcon />
          </IconButton>
          <IconButton 
              edge="end" className={classes.iconButton} color="inherit" aria-label="Menu"
              onClick={() => window.open('https://github.com/rayankans/contentindex.dev', '_blank')}
          >
            <GitHubIcon />
          </IconButton>
          {!hidePush && <IconButton
              edge="end" className={classes.notificationButton} color="inherit" aria-label="Notifications"
              onClick={() => setShowDialog(true)}
            >
              {notifOn ?  <NotificationsOffIcon /> : <NotificationsOnIcon />}
          </IconButton>} 
        </Toolbar>
        <SubscriptionDialog notifOn={notifOn} setNotifOn={setNotifOn} activated={showDialog} hide={() => setShowDialog(false)} />
      </AppBar>
    </div>
  );
}

export default withRouter(TopAppBar);
