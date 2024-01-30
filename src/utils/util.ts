export const APIURL = import.meta.env.DEV
  ? 'http://localhost:3001'
  : import.meta.env.VITE_URL;

export function cls(...classnames: string[]) {
  return classnames.join(' ');
}
