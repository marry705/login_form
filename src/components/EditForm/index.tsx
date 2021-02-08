import * as React from 'react';
import { Select, InputLabel, Input, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../units';
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

  if (true) { return <Redirect to={ROUTES.LOGIN} /> }

  return (
    <>
      <h1>Edit</h1>
    </>
  );
};

export default EditForm;