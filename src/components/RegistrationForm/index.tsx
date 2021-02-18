import * as React from 'react';
import {
  Select, InputLabel, Input, Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Company, User, InfoData } from '../../../server/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  navItem: {
    marginBottom: theme.spacing(2),
    textDecoration: 'none',
  },
  formContainer: {
    width: '20%',
    flex: '1 1 auto',
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
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

const RegistrationForm: React.FC = () => {
  const classes = useStyles();

  const [companies, setСompanies] = React.useState<Company[]>([]);
  const [info, setInfo] = React.useState<InfoData>(null);
  const [userCompany, setUserCompany] = React.useState<string>('');
  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');
  const [userName, changeUserName] = React.useState<string>('');

  React.useEffect(() => {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((res) => {
        setСompanies(res);
        setUserCompany(res[0].id);
      });
  }, []);

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);
  const [isNameValid, checkUserName] = React.useState<boolean>(false);
  const [isLoading, checkStatus] = React.useState<boolean>(false);

  const registrationUser = () => {
    const newUser: User = {
      id: '1',
      companyId: userCompany,
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    checkStatus(true);

    fetch('/api/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: newUser }),
    })
      .then(() => {
        setInfo({ message: 'User was created', type: 'success' });
      })
      .catch((error: Error) => setInfo({ message: error.message, type: 'error' }))
      .finally(() => checkStatus(false));

    // clearError = setTimeout(() => setInfo(null), 5000);
  };

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

  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className={classes.formContainer}
      >
        <Link to={ROUTES.LOGIN} className={classes.navItem}>
          <Button
            variant="contained"
            color="secondary"
          >
            Login
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
          { companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
          ;
        </Select>
        <Button
          onClick={registrationUser}
          variant="contained"
          color="secondary"
          disabled={!(isEmailValid && isPasswordValid && isNameValid) || isLoading}
        >
          Enter
        </Button>
        {info
          ? (
            <Alert severity={info.type}>
              {info.message}
            </Alert>
          )
          : null}
      </form>
    </>
  );
};

export default RegistrationForm;
