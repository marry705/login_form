import { Company } from '../redux/type';

let companies:Company[] = [];

async function getCompanies(): Promise<Company[]> {
  if (companies.length === 0) {
    const response = await fetch('/api/companies');
    companies = await response.json();
  }

  return companies;
}

export { getCompanies };
