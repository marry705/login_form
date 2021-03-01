import * as React from 'react';
import { Input } from '@material-ui/core';

interface Props {
    value: string,
    changeUserName: React.Dispatch<React.SetStateAction<string>>,
    checkUserName: React.Dispatch<React.SetStateAction<boolean>>,
}

const NameInput: React.FC<Props> = ({ value, changeUserName, checkUserName }: Props) => {
  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeUserName(e.target.value);
    checkUserName(/[A-Za-z]/.test(e.target.value) && e.target.value.length > 3);
  };

  return (
    <Input
      fullWidth
      required
      value={value}
      type="text"
      placeholder="Enter your name"
      onChange={changeNameHandler}
    />
  );
};

export default NameInput;
