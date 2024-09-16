export function isValidCompanyName(name) {
  if (!name || typeof name !== 'string') {
    return false;
  }

  name = name.trim();

  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Inclui caracteres acentuados e outros caracteres comuns em nomes de empresas brasileiras
  const validNamePattern = /^[a-zA-Z0-9&.\- áéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ]+$/;

  if (!validNamePattern.test(name)) {
    return false;
  }

  if (/^\d+$/.test(name)) {
    return false;
  }

  return true;
}