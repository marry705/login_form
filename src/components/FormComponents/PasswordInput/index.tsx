import * as React from 'react';
import { Input } from '@material-ui/core';

interface Props {
    value: string,
    changePassword: React.Dispatch<React.SetStateAction<string>>,
    checkPassword: React.Dispatch<React.SetStateAction<boolean>>,
}

const PasswordInput: React.FC<Props> = ({ value, changePassword, checkPassword }: Props) => {
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
    checkPassword(/[A-Za-z0-9]/.test(e.target.value) && e.target.value.length > 7);
  };

  return (
    <Input
      fullWidth
      required
      value={value}
      type="password"
      placeholder="Enter your password"
      onChange={changePasswordHandler}
    />
  );
};

export default PasswordInput;
