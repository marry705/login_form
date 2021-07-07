/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import InputField from '../FormComponents/InputField';
import InfoAlert from '../FormComponents/InfoAlert';
import ButtonElement from '../FormComponents/ButtonElement';
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
    overflow: 'auto',
    flex: '1 1 auto',
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
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
        <InputField
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          reg={/.+@.+\.[A-Za-z]+$/}
          changeField={changeEmail}
          checkField={checkEmail}
        />
        <InputField
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          reg={/[A-Za-z0-9]/}
          length={7}
          changeField={changePassword}
          checkField={checkPassword}
        />
        <ButtonElement
          onClick={setUser}
          disabled={!(isEmailValid && isPasswordValid) || loading}
        />
        <InfoAlert info={info} />
      </form>
    </>
  );
};

export default LoginForm;
