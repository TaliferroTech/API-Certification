/**
 * @param {any} data
 * @return {any}
 */
export function hasProperty<T extends {[key: string]: any}, K extends keyof T>(
  data: any,
  ...properties: K[]
): data is {[P in K]: T[P]} {
  return properties.every((prop) => prop in data);
}
