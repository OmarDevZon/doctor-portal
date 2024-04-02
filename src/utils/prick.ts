export const prick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const filter: Partial<T> = {};
  for (const key of keys) {
    if (obj && obj.hasOwnProperty.call(obj, key)) {
      filter[key] = obj[key];
    }
  }

  return filter;
};
