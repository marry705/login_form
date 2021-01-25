import * as React from 'react';
import { Select, Input, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  },
}));

const RegistrationForm: React.FC = () => {
  const classes = useStyles();

  const companies = [{ id: '0', name: 'new' }, { id: '1', name: 'new1' }, { id: '2', name: 'new2' }];
  const [userCompany, setUserCompany] = React.useState<{ id: string; name: string }>(companies[0]);

  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');
  const [userName, changeUserName] = React.useState<string>('');

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);
  const [isNameValid, checkUserName] = React.useState<boolean>(false);

  const registrationUser = () => {
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
    console.log(e.target.value);
    //setUserCompany()
  };

  return (
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
      <Select
        value={userCompany.id}
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
  );
};

export default RegistrationForm;