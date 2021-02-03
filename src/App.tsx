import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './units';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import EditForm from './components/EditForm';


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
        <Switch>
          <Route path={ROUTES.REGISTRATION} component={RegistrationForm}></Route>
          <Route path={ROUTES.LOGIN} component={LoginForm}></Route>
          <Route path={ROUTES.EDIT} component={EditForm}></Route>
        </Switch>
    </Box>
  );
};

export default App;
