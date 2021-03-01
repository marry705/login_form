import * as React from 'react';
import { Avatar } from '@material-ui/core';

interface Props {
    userPhoto: FormData,
    changeUserPhoto: React.Dispatch<React.SetStateAction<FormData>>,
}

const AvatarIcon: React.FC<Props> = ({ userPhoto, changeUserPhoto }: Props) => {
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0];
    const data = new FormData();
    data.append('file', selectedFile, selectedFile.name);
    changeUserPhoto(data);
    console.log(data);
  };

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onFileSelected}
      />
      <Avatar alt="yhui" src="/broken-image.jpg" />
    </>
  );
};

export default AvatarIcon;
