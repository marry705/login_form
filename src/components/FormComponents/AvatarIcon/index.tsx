import * as React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
    src: string,
    name: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const AvatarIcon: React.FC<Props> = ({ src, name }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Avatar
        alt={name}
        src={src}
        className={classes.large}
      />
    </>
  );
};

export default AvatarIcon;
