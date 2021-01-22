import * as React from 'react';
import { Input, Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  formContainer: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
  },
}));

const LoginForm: React.FC = () => {
  const classes = useStyles();

  const submitUser = () => {
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); }}
      className={classes.formContainer}
    >
      <Input
        fullWidth
        required
        type="email"
        placeholder="Enter new task"
      />
      <Input
        fullWidth
        required
        type="password"
        placeholder="Enter new task"
      />
      <Input
        fullWidth
        required
        type="text"
        placeholder="Enter your name"
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <Button
        onClick={submitUser}
      >
        Enter
      </Button>
    </form>
  );
};

export default LoginForm;