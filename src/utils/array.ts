export const dedup = (items: Array<any>) =>
  items.filter((item, index) => items.indexOf(item) === index);
