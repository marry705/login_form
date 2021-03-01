import * as React from 'react';
import { Select, InputLabel } from '@material-ui/core';
import { Company } from '../../../redux/type';

interface Props {
    companies: Company[],
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
}

const CompanySelect: React.FC<Props> = ({ companies, value, onChange }: Props) => {
  const handleChangeCompany = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange(e.target.value as string);
  };

  return (
    <>
      <InputLabel id="company-select-label">Company</InputLabel>
      <Select
        labelId="company-select-label"
        native
        variant="filled"
        value={value}
        onChange={handleChangeCompany}
      >
        { companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
        ;
      </Select>
    </>
  );
};

export default CompanySelect;
