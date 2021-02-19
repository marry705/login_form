/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Input, Button, Select, InputLabel,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  User, UserState, AppState, Company,
} from '../../redux/type';
import { edit, deleteUser, logout } from '../../redux/actions';
import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  navButton: {
    marginBottom: theme.spacing(2),
  },
  formContainer: {
    width: '20%',
    flex: '1 1 auto',
    margin: theme.spacing(2),
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
    '& .MuiInputBase-root': {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    '& .MuiFilledInput-input': {
      padding: '12px 12px 10px',
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiAlert-root': {
      width: '100%',
    },
  },
}));

const EditForm: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: UserState) => state);
  const { info, loading } = useSelector((state: AppState) => state);

  const [companies, setСompanies] = React.useState<Company[]>([]);
  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');
  const [userName, changeUserName] = React.useState<string>('');
  const [userCompany, setUserCompany] = React.useState<string>('');

  React.useEffect(() => {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((res) => {
        setСompanies(res);
      });

    if (user) {
      changeEmail(user.email);
      changePassword(user.password);
      changeUserName(user.name);
      setUserCompany(user.companyId);
    }
  }, []);

  const [isEmailValid, checkEmail] = React.useState<boolean>(true);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(true);
  const [isNameValid, checkUserName] = React.useState<boolean>(true);

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(e.target.value);
    checkEmail(/.+@.+\.[A-Za-z]+$/.test(e.target.value));
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
    checkPassword(/[A-Za-z0-9]/.test(e.target.value) && e.target.value.length > 7);
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeUserName(e.target.value);
    checkUserName(/[A-Za-z]/.test(e.target.value) && e.target.value.length > 3);
  };

  const handleChangeCompany = (e: React.ChangeEvent<{ value: unknown }>) => {
    setUserCompany(e.target.value as string);
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

  if (!isAuth) { return <Redirect to={ROUTES.LOGIN} />; }

  return (
    <>
      {loading
        ? <h1>Loading</h1>
        : (
          <div className={classes.formContainer}>
            <p>{userName}</p>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className={classes.formContainer}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(logout())}
                className={classes.navButton}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(deleteUser(user))}
                className={classes.navButton}
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
              <Input
                fullWidth
                required
                value={userName}
                type="text"
                placeholder="Enter your name"
                onChange={changeNameHandler}
              />
              <InputLabel id="company-select-label">Company</InputLabel>
              <Select
                labelId="company-select-label"
                native
                variant="filled"
                value={userCompany}
                onChange={handleChangeCompany}
              >
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
                ;
              </Select>
              <Button
                onClick={editUser}
                variant="contained"
                color="secondary"
                disabled={!(isEmailValid && isPasswordValid && isNameValid) || loading}
              >
                Update
              </Button>
              {info
                ? (
                  <Alert variant="outlined" severity={info.type}>
                    {info.type}
                  </Alert>
                )
                : null}
            </form>
          </div>
        )}
    </>
  );
};

export default EditForm;
