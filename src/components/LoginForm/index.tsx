import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { UserData, AppState, UserState } from '../../redux/type';
import { login } from '../../redux/actions';
import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  navItem: {
    textDecoration: 'none',
    marginBottom: theme.spacing(2),
  },
  formContainer: {
    width: '20%',
    flex: '1 1 auto',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInput-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiAlert-root': {
      width: '100%',
    },
  },
}));

const LoginForm: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: UserState) => state);
  const { info, loading } = useSelector((state: AppState) => state);

  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(e.target.value);
    checkEmail(/.+@.+\.[A-Za-z]+$/.test(e.target.value));
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
    checkPassword(/[A-Za-z0-9]/.test(e.target.value) && e.target.value.length > 7);
  };

  const setUser = () => {
    const currentUser: UserData = {
      email: userEmail,
      password: userPassword,
    };

    dispatch(login(currentUser));
  };

  if (isAuth) { return <Redirect to={ROUTES.EDIT} />; }

  return (
    <>
      {loading
        ? <h1>Loading</h1>
        : (
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className={classes.formContainer}
          >
            <Link to={ROUTES.REGISTRATION} className={classes.navItem}>
              <Button
                variant="contained"
                color="secondary"
              >
                Registration
              </Button>
            </Link>
            <Input
              fullWidth
              required
              value={userEmail}
              type="email"
              placeholder="Enter your email"
              onChange={changeEmailHandler}
            />
            <Input
              fullWidth
              required
              value={userPassword}
              type="password"
              placeholder="Enter your password"
              onChange={changePasswordHandler}
            />
            <Button
              onClick={setUser}
              variant="contained"
              color="secondary"
              disabled={!(isEmailValid && isPasswordValid) || loading}
            >
              Enter
            </Button>
            {info
              ? (
                <Alert variant="outlined" severity={info.type}>
                  {info.type}
                </Alert>
              )
              : null}
          </form>
        )}
    </>
  );
};

export default LoginForm;
