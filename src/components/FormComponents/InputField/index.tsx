import * as React from 'react';
import { Input } from '@material-ui/core';

interface Props {
    value: string,
    type?: string,
    placeholder: string,
    reg: RegExp,
    length?: number,
    changeField: React.Dispatch<React.SetStateAction<string>>,
    checkField: React.Dispatch<React.SetStateAction<boolean>>,
}

const InputField: React.FC<Props> = ({
  value, type, placeholder,
  reg, length,
  changeField, checkField,
}: Props) => {
  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeField(e.target.value);
    checkField(reg.test(e.target.value) && e.target.value.length > length);
  };

  return (
    <Input
      fullWidth
      required
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={changeNameHandler}
    />
  );
};

InputField.defaultProps = {
  type: 'text',
  length: 3,
};

export default InputField;
