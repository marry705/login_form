import * as React from 'react';
import { Button } from '@material-ui/core';

interface Props {
    name?: string,
    disabled?: boolean,
    className?: string,
    onClick: () => void,
}

const ButtonElement: React.FC<Props> = ({
  name, disabled, className, onClick,
}: Props) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {name}
  </Button>
);

ButtonElement.defaultProps = {
  name: 'Enter',
  disabled: false,
  className: '',
};

export default ButtonElement;
