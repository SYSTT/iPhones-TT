export const dedup = <T>(
  items: Array<T>,
  accessor: (item: T) => unknown = (item: T) => item,
) =>
  items.filter(
    (item, index) =>
      items.findIndex(current => accessor(item) === accessor(current)) ===
      index,
  );
