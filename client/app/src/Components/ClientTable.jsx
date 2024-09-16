import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { states } from "../globals";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, editClient } from "../redux/clients/clientSlice";
import { formatCpfCnpj } from "../globals/cpf";
import { fetchCities } from "../globals/fetchCities";

function TableContent({  values }) {
  const dispatch = useDispatch();
  const [client, addClient] = useState(values);
  const [selectedState, setSelectedState] = useState(client.state);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      try {
        fetchCities(selectedState).then(data => {
          setCities(data);
          setLoading(false);
        });
      } catch(error){
        setLoading(false);
      }
    }
  }, [selectedState]);
  
  const update = async (clientData) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/client/${client.CPF}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      }
    );
    const data = await response.json();
    dispatch(editClient(data));
  }

  const removeClient = async () => {
    try{
      const response = await fetch(
        `http://127.0.0.1:8000/api/client/${client.CPF}`,
        {
          method: "DELETE"
        }
      );
    } catch (err) {
      console.log(err);
    }
    dispatch(deleteClient(client))
  }

  const submitClient = async () => {
    const clientData = client;
    try {
      update(clientData);
    } catch (err) {
      console.log(err);
    }
    dispatch(editClient(clientData));
  };
  
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          className="form-control"
          value={formatCpfCnpj(client.CPF)}
          onChange={(e) =>
            addClient((prev) => {
              return { ...prev, CPF: e.target.value };
            })
          }
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="text"
          className="form-control"
          value={client.client_name}
          onChange={(e) =>
            addClient((prev) => {
              return { ...prev, client_name: e.target.value };
            })
          }
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="text"
          className="form-control"
          value={client.farm_name}
          onChange={(e) =>
            addClient((prev) => {
              return { ...prev, farm_name: e.target.value };
            })
          }
        ></Form.Control>
      </td>
      <td>
        <Form.Control
            as="select"
            disabled={!selectedState || loading}
            value={client.city}
            onChange={(e) => {
              addClient((prev) => {
                return { ...prev, city: e.target.value };
              });
            }}
          >
            <option value="">
              {loading ? "Carregando..." : "Selecione um estado primeiro"}
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nome}
              </option>
            ))}
          </Form.Control>
      </td>
      <td>
        <Form.Control
            as="select"
            value={client.state}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Selecione uma unidade federativa</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          className="form-control"
          value={client.total_area}
          onChange={(e) => {
            addClient((prev) => {
              return { ...prev, total_area: e.target.value };
            });
          }}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          className="form-control"
          value={client.useful_area}
          onChange={(e) => {
            addClient((prev) => {
              return { ...prev, useful_area: e.target.value };
            });
          }}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          className="form-control"
          value={client.vegetation_area}
          onChange={(e) => {
            addClient((prev) => {
              return { ...prev, vegetation_area: e.target.value };
            });
          }}
        ></Form.Control>
      </td>
      <td>
        <select
          className="form-control"
          value={client.crops}
          onChange={(e) => {
            addClient((prev) => {
              return { ...prev, crops: e.target.value };
            });
          }}
        >
          <option value={1}>Soja</option>
          <option value={2}>Milho</option>
          <option value={3}>Algodão</option>
          <option value={4}>Café</option>
          <option value={5}>Cana de Açúcar</option>
        </select>
      </td>
      <td> <button className="btn btn-success" onClick={submitClient}> Enviar </button> </td>
      <td> <button className="btn btn-danger" onClick={removeClient}> Deletar </button> </td>
    </tr>
  );
}

function ClientInfo() {

  const clients = useSelector((state) => state.clientes.clientes);
  console.log(clients);
  console.log("calling here?");
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
          <th> Alterar </th>
          <th> Remover </th>
        </tr>
      </thead>
      <tbody>
        <>
          {clients.map((e, key) => {
            return <TableContent values = {e} key = {key}></TableContent>;
          })}
        </>
      </tbody>
    </Table>
  );
}

export default ClientInfo;
