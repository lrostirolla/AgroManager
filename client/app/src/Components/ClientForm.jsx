import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { globals, initialState } from '../globals';

window.globals = globals;

const FarmForm = ({type}) => {

  // Get cities given a state...
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [client, addClient] = useState(initialState());

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
        .then(response => response.json())
        .then(data => {
          setCities(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao carregar municípios:', error);
          setLoading(false);
        });
      addClient((prev) => {return {...prev, state : selectedState}});
    }
    
  }, [selectedState]);
  
  //======================================================================
  
  globals[`${type}HooksClient`] = client; 
  globals[`${type}HooksAddClient`] = addClient; 

  // states =========> 
  const states = [
    { "id": 12, "name": "AC" },
    { "id": 27, "name": "AL" },
    { "id": 16, "name": "AP" },
    { "id": 13, "name": "AM" },
    { "id": 29, "name": "BA" },
    { "id": 23, "name": "CE" },
    { "id": 53, "name": "DF" },
    { "id": 32, "name": "ES" },
    { "id": 52, "name": "GO" },
    { "id": 21, "name": "MA" },
    { "id": 51, "name": "MT" },
    { "id": 50, "name": "MS" },
    { "id": 31, "name": "MG" },
    { "id": 15, "name": "PA" },
    { "id": 25, "name": "PB" },
    { "id": 41, "name": "PR" },
    { "id": 26, "name": "PE" },
    { "id": 22, "name": "PI" },
    { "id": 33, "name": "RJ" },
    { "id": 24, "name": "RN" },
    { "id": 43, "name": "RS" },
    { "id": 11, "name": "RO" },
    { "id": 14, "name": "RR" },
    { "id": 42, "name": "SC" },
    { "id": 35, "name": "SP" },
    { "id": 28, "name": "SE" },
    { "id": 17, "name": "TO" }
  ]


  
  const update = (() => {
    switch(type){
      case "create" : {
        return async (clientData) => {
          const response = await fetch("http://127.0.0.1:8000/api/client/create", {
            method : "POST", 
            headers : {
              'Content-Type' : "application/json",
    
            },
            body: JSON.stringify(clientData)
    
          });
          const data = await response.json();
          console.log(data);
        }
      }
      case "edit" : {
        return async (clientData) => {
          const response = await fetch(`http://127.0.0.1:8000/api/client/${globals.fetchCPF}`, {
            method : "PUT", 
            headers : {
              'Content-Type' : "application/json",
    
            },
    
            body: JSON.stringify(clientData)
          });
          const data = await response.json();
          console.log(data);
        }
      }
    }
  })();


  const submitClient = async () => {
    console.log(client);
    const clientData = client;
    try {
      update(clientData);
    } catch (err){
      console.log(err);
    }

    addClient(initialState);


  }
  

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label htmlFor={`agro-${type}-cpf`} > CPF/CNPJ </Form.Label>
          <Form.Control  type="text" id={`agro-${type}-cpf`} placeholder={"Digite o CPF ou CNPJ"} value = {client.CPF} onChange = {
            (e) => { addClient((prev) => {return {...prev, CPF : e.target.value}}); }
            
          }/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor={`agro-${type}-name`}> Nome do Produtor </Form.Label>
          <Form.Control  type="text" id={`agro-${type}-cpf`} placeholder={"Digite o nome do produtor"} value = {client.client_name} onChange = {
            (e) => {
              addClient((prev) => {return {...prev, client_name : e.target.value }});
            }
          }/>
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Label htmlFor={`agro-${type}-farm`}> Nome da Fazenda </Form.Label>
          <Form.Control  type="text" id={`agro-${type}-farm`} placeholder={"Digite o nome da fazenda"} value = {client.farm_name} onChange = {
            (e) => {
              addClient((prev) => {return {...prev, farm_name : e.target.value}});
            }
          }/>
      </Form.Group>
      <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Cidade</Form.Label>
              <Form.Control as="select" disabled={!selectedState || loading} value = {client.city} onChange = 
                {
                  (e) => {
                    addClient((prev) => {return {...prev, city : e.target.value}});
                  }
                }>
                <option value="">{loading ? 'Carregando...' : 'Selecione um estado primeiro'}</option>
                  {
                    cities.map(city => (
                      <option key={city.id} value={city.id}>{city.nome}</option>
                    ))
                  }
              </Form.Control>
            </Form.Group>
          
            <Form.Group as={Col}>
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" id = {`agro-${type}-uf`} value = {client.state} onChange={e => setSelectedState(e.target.value)}>
                <option value="">Selecione uma unidade federativa</option>
                  { 
                  states.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                  ))
                }
              </Form.Control>  
            </Form.Group>
      </Row>
      <Form.Group controlId="formTotalArea">
        <Form.Label>Área total em hectares da fazenda</Form.Label>
        <Form.Control type="number" placeholder="Digite a área total em hectares" value = {client.total_area} onChange = {
            (e) => {
              addClient((prev) => {return {...prev, total_area : e.target.value}});
            }
          }/>
      </Form.Group>
      <Form.Group controlId="formAgriculturalArea">
        <Form.Label>Área agricultável em hectares</Form.Label>
        <Form.Control type="number" placeholder="Digite a área agricultável em hectares" value = {client.useful_area} onChange = {
            (e) => {
              addClient((prev) => {return {...prev, useful_area : e.target.value}});
            }
          }/>
      </Form.Group>
      <Form.Group controlId="formVegetationArea">
        <Form.Label>Área de vegetação em hectares</Form.Label>
        <Form.Control type="number" placeholder="Digite a área de vegetação em hectares" value = {client.vegetation_area} onChange = {
            (e) => {
              addClient((prev) => { return {...prev, vegetation_area : e.target.value} });
            }
          }/>
      </Form.Group>
      <Form.Group controlId="formCrops">
        <Form.Label>Culturas plantadas</Form.Label>
        <Form.Control as="select" value = {client.crops} onChange = {
            (e) => {
              addClient((prev) => {return {...prev, crops : e.target.value}});
            }
          }>
          <option value = {0}> {client.crops} </option>
          <option value = {1}>Soja</option>
          <option value = {2}>Milho</option>
          <option value = {3}>Algodão</option>
          <option value = {4}>Café</option>
          <option value = {5}>Cana de Açúcar</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" onClick= { submitClient }> Enviar </Button>
    </Form>
  );
};

export default FarmForm;