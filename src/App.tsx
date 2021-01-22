import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ROUTES from './units';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LoginForm from './components/LoginForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* <BrowserRouter>
        <Switch>
          <Route path={ROUTES.LOGIN}></Route>
          <Route path={ROUTES.REGISTRATION}></Route>
        </Switch>
      </BrowserRouter> */}
    </Box>
  );
};

export default App;
