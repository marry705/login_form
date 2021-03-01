/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CompanySelect from '../FormComponents/CompanySelect';
import EmailInput from '../FormComponents/EmailInput';
import NameInput from '../FormComponents/NameInput';
import PasswordInput from '../FormComponents/PasswordInput';
import AvatarIcon from '../FormComponents/AvatarIcon';
import { ROUTES } from '../../constants';
import { MainState, User, Company } from '../../redux/type';
import {
  stopRequest, startRequest, cleaneInfo, addError, addInfo,
} from '../../redux/actions';
import getCompanies from '../../services/catchService';

const useStyles = makeStyles((theme: Theme) => createStyles({
  navItem: {
    marginBottom: theme.spacing(2),
    textDecoration: 'none',
  },
  formContainer: {
    width: '20%',
    flex: '1 1 auto',
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInput-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
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
    },
    '& .MuiAlert-root': {
      width: '100%',
    },
  },
}));

const RegistrationForm: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { info, loading } = useSelector((state: MainState) => state.application);

  const [companies, setСompanies] = React.useState<Company[]>([]);
  const [userCompany, setUserCompany] = React.useState<string>('');
  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');
  const [userName, changeUserName] = React.useState<string>('');
  const [userPhoto, changeUserPhoto] = React.useState<FormData>(new FormData());

  React.useEffect(() => {
    dispatch(cleaneInfo());
    async function fetchData() {
      const res = await getCompanies();
      setСompanies(res);
      setUserCompany(res[0].id);
    }
    fetchData();
  }, []);

  const [isEmailValid, checkEmail] = React.useState<boolean>(false);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(false);
  const [isNameValid, checkUserName] = React.useState<boolean>(false);

  const registrationUser = () => {
    const newUser: User = {
      id: '1',
      companyId: userCompany,
      name: userName,
      email: userEmail,
      password: userPassword,
      photo: userPhoto,
    };

    dispatch(cleaneInfo());
    dispatch(startRequest());

    fetch('/api/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: newUser }),
    })
      .then(() => {
        dispatch(addInfo('User was created.'));
      })
      .catch((err: Error) => dispatch(addError(err.message)))
      .finally(() => dispatch(stopRequest()));

    setTimeout(() => dispatch(cleaneInfo()), 5000);
  };

  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className={classes.formContainer}
      >
        <Link to={ROUTES.LOGIN} className={classes.navItem}>
          <Button
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </Link>
        <AvatarIcon userPhoto={userPhoto} changeUserPhoto={changeUserPhoto} />
        <EmailInput value={userEmail} changeEmail={changeEmail} checkEmail={checkEmail} />
        <PasswordInput value={userPassword} changePassword={changePassword} checkPassword={checkPassword} />
        <NameInput value={userName} changeUserName={changeUserName} checkUserName={checkUserName} />
        <CompanySelect value={userCompany} companies={companies} onChange={setUserCompany} />
        <Button
          onClick={registrationUser}
          variant="contained"
          color="secondary"
          disabled={!(isEmailValid && isPasswordValid && isNameValid) || loading}
        >
          Enter
        </Button>
        {info
          ? (
            <Alert variant="outlined" severity={info.type}>
              {info.type}
            </Alert>
          )
          : null}
      </form>
    </>
  );
};

export default RegistrationForm;
