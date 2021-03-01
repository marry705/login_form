/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CompanySelect from '../FormComponents/CompanySelect';
import EmailInput from '../FormComponents/EmailInput';
import NameInput from '../FormComponents/NameInput';
import AvatarIcon from '../FormComponents/AvatarIcon';
import PasswordInput from '../FormComponents/PasswordInput';
import { User, MainState, Company } from '../../redux/type';
import {
  edit, deleteUser, logout, cleaneInfo,
} from '../../redux/actions';
import getCompanies from '../../services/catchService';
import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  navButton: {
    marginBottom: theme.spacing(2),
  },
  formContainer: {
    width: '20%',
    flex: '1 1 auto',
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
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

const EditForm: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: MainState) => state.user);
  const { info, loading } = useSelector((state: MainState) => state.application);

  const [companies, setСompanies] = React.useState<Company[]>([]);
  const [userEmail, changeEmail] = React.useState<string>('');
  const [userPassword, changePassword] = React.useState<string>('');
  const [userName, changeUserName] = React.useState<string>('');
  const [userCompany, setUserCompany] = React.useState<string>('');
  const [userPhoto, changeUserPhoto] = React.useState<FormData>(new FormData());

  React.useEffect(() => {
    dispatch(cleaneInfo());
    async function fetchData() {
      const res = await getCompanies();
      setСompanies(res);
    }
    fetchData();

    if (user) {
      changeEmail(user.email);
      changePassword(user.password);
      changeUserName(user.name);
      changeUserPhoto(user.photo);
      setUserCompany(user.companyId);
    }
  }, []);

  const [isEmailValid, checkEmail] = React.useState<boolean>(true);
  const [isPasswordValid, checkPassword] = React.useState<boolean>(true);
  const [isNameValid, checkUserName] = React.useState<boolean>(true);

  const editUser = () => {
    const currentUser: User = {
      id: user.id,
      companyId: user.companyId,
      name: userName,
      email: userEmail,
      password: userPassword,
      photo: userPhoto,
    };

    dispatch(edit(currentUser));
  };

  if (!isAuth) { return <Redirect to={ROUTES.LOGIN} />; }

  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className={classes.formContainer}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(logout())}
          className={classes.navButton}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(deleteUser(user))}
          className={classes.navButton}
        >
          Remove
        </Button>
        <AvatarIcon userPhoto={userPhoto} changeUserPhoto={changeUserPhoto} />
        <EmailInput value={userEmail} changeEmail={changeEmail} checkEmail={checkEmail} />
        <PasswordInput value={userEmail} changePassword={changePassword} checkPassword={checkPassword} />
        <NameInput value={userName} changeUserName={changeUserName} checkUserName={checkUserName} />
        <CompanySelect value={userCompany} companies={companies} onChange={setUserCompany} />
        <Button
          onClick={editUser}
          variant="contained"
          color="secondary"
          disabled={!(isEmailValid && isPasswordValid && isNameValid) || loading}
        >
          Update
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

export default EditForm;
