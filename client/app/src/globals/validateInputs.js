import { validateCpfCnpj } from "./cpf";
import { isInteger } from "./isInteger";
import { isProperName } from "./isProperName";
import { isValidCompanyName } from "./isValidCompanyName";
import { isNumeric } from "./isNumeric";
export function validateInputs(clientData){
  let {CPF, client_name, farm_name, city, state, total_area, useful_area, vegetation_area, crops} = clientData;

  let erros = {};

  // if(!validateCpfCnpj(CPF)){
  //   erros["CPF"] = "CPF/CNPJ invalidos";
  // }

  if(!isProperName(client_name)){
    erros["client_name"] = "Nome invalido";
  }

  if(!isInteger(city)){
    erros["city"] = "Nenhuma cidade foi selecionada";
  }

  if(!isInteger(state)){
    erros["state"] = "Nenhum estado foi selecionado";
  }

  if(!isValidCompanyName(farm_name)){
    erros["farm_name"] = "Nome da propriedade invalido";
  }

  useful_area     = Number(useful_area);
  vegetation_area = Number(vegetation_area);
  total_area      = Number(total_area);

  if(useful_area < 0){
    erros["useful_area"] = "Área útil deve ser maior ou igual a zero";
  }

  if(vegetation_area < 0){
    erros["vegetation_area"] = "Área de vegetação deve ser maior ou igual a zero";
  }

  if(useful_area + vegetation_area !== total_area){
    erros["total_area"] = "Área de plantação + área de vegetação não são compatíveis com a área total";
  }

  if(!["1", "2", "3", "4", "5"].includes(crops)){
    erros["crops"] = "Você deve selecionar uma cultura";

  }

  return erros;
} 