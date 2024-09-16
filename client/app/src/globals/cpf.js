export function validateCpfCnpj(value) {
  value = value.replace(/[^\d]+/g, '');
  if (value.length === 11) {
    return validateCPF(value);
  } else if (value.length === 14) {
    return validateCNPJ(value);
  } else {
    return false;
  }
}

function validateCPF(cpf) {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  return remainder === parseInt(cpf.charAt(10));
}

function validateCNPJ(cnpj) {
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
}

export function formatCpfCnpj(value) {
  try {
    value = value.replace(/[^\d]+/g, '');

    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length === 14) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return value;
    }  
  } catch (error) {
    console.log(value);
  }
}

export function removeSpecialCharacters(value) {
  return value.replace(/[.\-\/]/g, '');
}

// // Exemplos de uso:
// console.log(validarCpfCnpj("12345678909")); // false
// console.log(validarCpfCnpj("11144477735")); // true
// console.log(validarCpfCnpj("12345678000195")); // false
// console.log(validarCpfCnpj("11444777000161")); // true

// // Exemplos de uso:
// console.log(formatarCpfCnpj("12345678909")); // "123.456.789-09"
// console.log(formatarCpfCnpj("12345678000195")); // "12.345.678/0001-95"
