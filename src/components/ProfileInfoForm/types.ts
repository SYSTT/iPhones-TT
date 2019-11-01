export interface FormField<T> {
  value: T;
  error?: string;
}

export interface ProfileInfo {
  email: FormField<string>;
  firstName: FormField<string>;
  lastName: FormField<string>;
  password: FormField<string>;
  [key: string]: FormField<string>;
}

export interface ProfileInfoValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  [key: string]: string;
}
