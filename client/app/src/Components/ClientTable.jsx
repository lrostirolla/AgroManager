import { useEffect } from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { globals } from '../globals';

function ClientInfo() {
  const [loading, setLoading] = useState(true);
  const [clients, useClients] = useState([]);

  const fetchAllClients = async () => {
    console.log("fetch all clients...");
    try { 
      const response = await fetch(`http://127.0.0.1:8000/api/client/get_clients`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }    
  } 

  useEffect(() => {
    fetchAllClients().then(data => {
      useClients(data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false);
    })
  }, [])
  window.clients = clients;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>CPF/CNPJ</th>
          <th>Nome do produtor</th>
          <th>Nome da Fazenda</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Área Total (hectares)</th>
          <th>Área cultivavel (hectares)</th>
          <th>Área de vegetação (hectares)</th>
          <th>Culturas plantadas</th>
        </tr>
      </thead>
      <tbody> 
        {
          
          clients.map(e => {
            const values = Object.entries(e).reduce((acc, [key, value], index) => {
              if (index !== 0) acc.push(value);
              return acc;
            }, []);
            return <tr>
              {
                
                values.map(u => {
                  return <td>{u}</td>
                })
              }
            </tr>
          })
        }

      </tbody>
    </Table>
  );
}

export default ClientInfo;