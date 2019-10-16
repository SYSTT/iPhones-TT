export const dedup = (items: Array<any>, accessor = (item: any) => item) =>
  items.filter(
    (item, index) => items.findIndex(
      current => accessor(item) === accessor(current)
    ) === index
  );
