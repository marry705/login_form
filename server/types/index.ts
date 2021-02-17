export type User = {
    id: string,
    companyId: string,
    name: string,
    email: string,
    password: string
};

export type Company = {
    id: string,
    name: string,
};

export type InfoData = {
    message: string,
    type: 'error' | 'success',
};