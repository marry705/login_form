import * as React from 'react';
import { Select, InputLabel, Input, Button, AppBar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../units';
import { Compony, User } from '../../types'

const useStyles = makeStyles((theme: Theme) => createStyles({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  navItem: {
    textDecoration: 'none',
  },
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

const RegistrationForm: React.FC = () => {
  const classes = useStyles();
  const [companies, setСompanies] = React.useState<Compony[]>([]);
  const [userCompany, setUserCompany] = React.useState<string>('');
  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');
  const [userName, changeUserName] = React.useState<string>('');

  React.useEffect(() => {
    fetch('/api/company')
      .then(res => res.json())
      .then((res) => {
        setСompanies(res); 
        setUserCompany(res[0].id);
      });
  }, []);

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);
  const [isNameValid, checkUserName] = React.useState<boolean>(false);

  const registrationUser = () => {
    const newUser: User = {
      id: '1',
      componyId: userCompany,
      name: userName,
      email: userEmail,
      password: userPassword
    };

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: newUser })})
        .then((req) => {
          console.log(req);
        })
        .catch(err => {
          console.error(err);
        });
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
      <AppBar className={classes.headerBar} color="transparent" position="static">
        <Link to={ROUTES.LOGIN} className={classes.navItem}>
          <Button
            variant="contained"
            color="secondary" 
            >
            Login
          </Button>
        </Link>
      </AppBar>

      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className={classes.formContainer}
      >
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
        <InputLabel id="compony-select-label">Compony</InputLabel>
        <Select
          labelId="compony-select-label"
          native
          variant="filled"
          value={userCompany}
          onChange={handleChangeCompany}
        >
          { companies.map(company =>
            <option key={company.id} value={company.id}>{company.name}</option>
          )};
        </Select>
        <Button
          onClick={registrationUser}
          variant="contained"
          color="secondary"
          disabled={!(isEmailValid && isPasswordValid && isNameValid)}
        >
          Enter
        </Button>
      </form>
    </>
  );
};

export default RegistrationForm;