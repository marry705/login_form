import * as React from 'react';
import { Alert } from '@material-ui/lab';
import { InfoData } from '../../../redux/type';

interface Props {
    info: InfoData,
}

const InfoAlert: React.FC<Props> = ({ info }: Props) => (
  <>
    {info
      ? (
        <Alert variant="outlined" severity={info.type}>
          {info.type}
        </Alert>
      )
      : null}
  </>
);

export default InfoAlert;
