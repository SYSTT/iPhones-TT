export const toSlug = (stringValue: string) =>
  stringValue
    .toLowerCase()
    // Replace invalid characters
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-');
