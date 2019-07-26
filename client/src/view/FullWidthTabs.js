import React from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import AddCustomContentButton from './AddCustomContentButton';
import NewContentView from './NewContentView';
import SavedContentView from './SavedContentView';

function TabContainer({ children, dir }) {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
  };

  return (
    <Typography component="div" dir={dir} style={style}>
      {children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(props.location.pathname.startsWith('/saved') ? 1 : 0);
  React.useEffect(() => props.history.listen(({pathname}) => setValue(pathname.startsWith('/saved') ? 1 : 0)));

  function handleChangeIndex(index, history) {
    if (index === 0)
      history.push('/');
    else if (index === 1)
      history.push('/saved');

    setValue(index);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(_, index) => handleChangeIndex(index, props.history)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="New Content" />
          <Tab label="Saved Content" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={index => handleChangeIndex(index, props.history)}
      >
        <TabContainer dir={theme.direction}>
          <NewContentView articles={[]} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <SavedContentView />
        </TabContainer>
      </SwipeableViews>
      <AddCustomContentButton />
    </div>
  );
}

export default withRouter(FullWidthTabs);
