import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { globals } from '../globals';


export const SubmitButtons = () => {


  const fetchClient = async (client) => {
    console.log("fetching client....");
    try { 
      const response = await fetch(`http://127.0.0.1:8000/api/client/${client}`);
      const data = await response.json();
      globals.editHooksAddClient(data);
    } catch (err) {
      console.log(err);
    }
  }

  const cpfElement = document.querySelector("#agro-cpf");
  
  return (
    <ButtonGroup className='agro-edit-info'>
      <Button variant="primary" type="submit" onClick = {
        () => {
          const currentState = globals["fetchCPF"];
          fetchClient(currentState);
          console.log(cpfElement);
          cpfElement.placeholder = "Digite o CPF/CNPJ do Cliente"
          cpfElement.value = "";
        }
      }>Enviar</Button>
      <Button variant="danger" type="button" onClick = {
        () => {

        }
      }> Deletar </Button>
    </ButtonGroup>
  );
};

