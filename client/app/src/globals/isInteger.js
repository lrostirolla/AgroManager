export function isInteger(str) {
  const pattern = /^-?\d+$/;
  return pattern.test(str);
}