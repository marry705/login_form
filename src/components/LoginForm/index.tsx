import * as React from 'react';
import { Input, Button } from '@material-ui/core';
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

const LoginForm: React.FC = () => {
  const classes = useStyles();

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
      <Button
        onClick={setUser}
        variant="contained"
        color="secondary"
        disabled={!(isEmailValid && isPasswordValid)}
      >
        Enter
      </Button>
    </form>
  );
};

export default LoginForm;