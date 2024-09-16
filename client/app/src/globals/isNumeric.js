export function isNumeric(str) {
  const pattern = /^-?\d+(\.\d+)?$/;
  return pattern.test(str);
}