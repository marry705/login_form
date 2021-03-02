/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CompanySelect from '../FormComponents/CompanySelect';
import AvatarIcon from '../FormComponents/AvatarIcon';
import InputField from '../FormComponents/InputField';
import InfoAlert from '../FormComponents/InfoAlert';
import ButtonElement from '../FormComponents/ButtonElement';
import { User, MainState, Company } from '../../redux/type';
import {
  edit, deleteUser, logout, cleaneInfo,
} from '../../redux/actions';
import { getCompanies } from '../../services/catchService';
import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  navButton: {
    marginBottom: theme.spacing(2),
  },
  formContainer: {
    width: '20%',
    overflow: 'auto',
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
        <ButtonElement
          name="Logout"
          onClick={() => dispatch(logout())}
          className={classes.navButton}
        />
        <ButtonElement
          name="Remove"
          onClick={() => dispatch(deleteUser(user))}
          className={classes.navButton}
        />
        <AvatarIcon
          src="/broken-image.jpg"
          name={userName}
        />
        <InputField
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          reg={/.+@.+\.[A-Za-z]+$/}
          changeField={changeEmail}
          checkField={checkEmail}
        />
        <InputField
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          reg={/[A-Za-z0-9]/}
          length={7}
          changeField={changePassword}
          checkField={checkPassword}
        />
        <InputField
          placeholder="Enter your name"
          value={userName}
          reg={/[A-Za-z]/}
          changeField={changeUserName}
          checkField={checkUserName}
        />
        <CompanySelect
          value={userCompany}
          companies={companies}
          onChange={setUserCompany}
        />
        <ButtonElement
          name="Update"
          onClick={editUser}
          disabled={!(isEmailValid && isPasswordValid && isNameValid) || loading}
        />
        <InfoAlert info={info} />
      </form>
    </>
  );
};

export default EditForm;
