import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { User, UserState } from '../../redux/type';
import { Select, InputLabel, Input, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { edit } from '../../redux/actions';
import { ROUTES } from '../../constants';


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

const EditForm: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isAuth, error, loading, user } = useSelector((state: UserState) => state);

  const editUser = () => {
    const currentUser: User = {
      // id: user.id,
      // companyId: user.companyId,
      // name: userName,
      // email: userEmail,
      // password: userPassword,
    };

    dispatch(edit(currentUser));
  };

  if (!isAuth) { return <Redirect to={ROUTES.LOGIN} /> }

  return (
    <>
      <h1>Edit</h1>
    </>
  );
};

export default EditForm;