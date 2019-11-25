export const toSlug = (stringValue: string) =>
  stringValue
    .toLowerCase()
    // Replace invalid characters
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (stringValue: string) =>
  EMAIL_REGEX.test(stringValue);

const PASSWORD_REGEX = /^.{8}.*$/;
export const isValidPassword = (stringValue: string) =>
  PASSWORD_REGEX.test(stringValue);
