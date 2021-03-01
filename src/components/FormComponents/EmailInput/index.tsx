import * as React from 'react';
import { Input } from '@material-ui/core';

interface Props {
    value: string,
    changeEmail: React.Dispatch<React.SetStateAction<string>>,
    checkEmail: React.Dispatch<React.SetStateAction<boolean>>,
}

const EmailInput: React.FC<Props> = ({ value, changeEmail, checkEmail }: Props) => {
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(e.target.value);
    checkEmail(/.+@.+\.[A-Za-z]+$/.test(e.target.value));
  };

  return (
    <Input
      fullWidth
      required
      value={value}
      type="email"
      placeholder="Enter your email"
      onChange={changeEmailHandler}
    />
  );
};

export default EmailInput;
