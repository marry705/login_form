/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import EmailInput from '../FormComponents/EmailInput';
import PasswordInput from '../FormComponents/PasswordInput';
import { UserData, MainState } from '../../redux/type';
import { login, cleaneInfo } from '../../redux/actions';
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
    backgroundColor: theme.palette.background.default,
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
  const { isAuth } = useSelector((state: MainState) => state.user);
  const { info, loading } = useSelector((state: MainState) => state.application);

  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(cleaneInfo());
  }, []);

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
        <EmailInput value={userEmail} changeEmail={changeEmail} checkEmail={checkEmail} />
        <PasswordInput value={userPassword} changePassword={changePassword} checkPassword={checkPassword} />
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
    </>
  );
};

export default LoginForm;
