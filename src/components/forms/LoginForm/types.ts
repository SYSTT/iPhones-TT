import { FormField } from '../types';

export interface LoginInfo {
  email: FormField<string>;
  password: FormField<string>;
  [key: string]: FormField<string>;
}

export interface LoginInfoValues {
  email: string;
  password: string;
  [key: string]: string;
}
