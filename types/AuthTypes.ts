export type IRegisterInput = {
  email: string;
  password: string;
  account_type: string;
  phone?: string;
};
export type ILoginInput = {
  email: string;
  password: string;
};
