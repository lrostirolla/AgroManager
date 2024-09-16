export function isProperName(name) {
  if (!name || typeof name !== 'string') {
    return false;
  }

  // Expressão regular para permitir letras maiúsculas, minúsculas e acentuadas
  const namePattern = /^[A-ZÀ-Ÿ][a-zà-ÿ]*$/;
  const words = name.split(' ');

  for (let word of words) {
    if (!namePattern.test(word)) {
      return false;
    }
  }

  return true;
}