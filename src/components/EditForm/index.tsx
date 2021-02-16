import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { User, UserState } from '../../redux/type';
import { Input, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { edit, deleteUser, logout } from '../../redux/actions';
import { ROUTES } from '../../constants';


const useStyles = makeStyles((theme: Theme) => createStyles({
  formContainer: {
    flex: '1 1 auto',
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInput-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiInputBase-root': {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    '& .MuiFilledInput-input': {
      padding: '12px 12px 10px',
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.palette.background.default,
    }
  },
}));

const EditForm: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isAuth, error, loading, user } = useSelector((state: UserState) => state);

  const [userEmail, changeEmail] = React.useState<string>(user.email);
  const [userPassword, changePassword] = React.useState<string>(user.password);
  const [userName, changeUserName] = React.useState<string>(user.name);

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);
  const [isNameValid, checkUserName] = React.useState<boolean>(false);

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(e.target.value);
    checkEmail(/.+@.+\.[A-Za-z]+$/.test(e.target.value));
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
    checkPassword(/[A-Za-z0-9]/.test(e.target.value) && e.target.value.length > 7);
  };

  const editUser = () => {
    const currentUser: User = {
      id: user.id,
      companyId: user.companyId,
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    dispatch(edit(currentUser));
  };

  if (!isAuth) { return <Redirect to={ROUTES.LOGIN} /> }

  return (
    <>
      {loading
      ? 
        <h1>Loading</h1>
      :
        <form
          onSubmit={(e) => { e.preventDefault() }}
          className={classes.formContainer}
        >
          <Button
            variant="contained"
            color="secondary" 
            onClick={() => dispatch(logout())}
            >
            Logout
          </Button>
          <Button
            variant="contained"
            color="secondary" 
            onClick={() => dispatch(deleteUser(user))}
            >
            Remove
          </Button>
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
            onClick={editUser}
            variant="contained"
            color="secondary"
            disabled={!(isEmailValid && isPasswordValid) || loading}
          >
            Enter
          </Button>
          {error
            ? <Alert variant="outlined" severity="error">
                {error}
              </Alert>
            : null
          }
        </form>
      }
    </>
  );
};

export default EditForm;