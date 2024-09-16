import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { initialState, states } from "../globals";
import { useDispatch } from "react-redux";
import { addClient  } from "../redux/clients/clientSlice";
import { fetchCities } from "../globals/fetchCities";
import { formatCpfCnpj, removeSpecialCharacters } from "../globals/cpf";
import { validateInputs } from "../globals/validateInputs";

const FarmForm = ({ type }) => {

  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [client, addNewClient] = useState(initialState());

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      try {
        fetchCities(selectedState).then(data => {
          setCities(data);
          setLoading(false);
        });
        addNewClient((prev) => {
          return { ...prev, state: selectedState };
        }); 
      } catch(error){
        setLoading(false);
      }
    }
  }, [selectedState]);

  const update = async (clientData) => {
    const _errors = validateInputs(clientData);
    setErrors(_errors);
    console.log(_errors);
    console.log(Object.keys(_errors).length === 0);
    if(Object.keys(_errors).length === 0){
      clientData.CPF = removeSpecialCharacters(clientData.CPF);
      const response = await fetch(
        "/api/client/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientData),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(addClient(data));
      addNewClient(initialState());        
    }
  }; 

  const submitClient = async () => {
    const clientData = client;
    try {
      update(clientData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label htmlFor={`agro-${type}-cpf`}> CPF/CNPJ </Form.Label>
          <Form.Control
            type="text"
            id={`agro-${type}-cpf`}
            placeholder={"Digite o CPF ou CNPJ"}
            value={formatCpfCnpj(client.CPF)}
            onChange={(e) => {
              addNewClient((prev) => {
                return { ...prev, CPF: e.target.value };
              });
            }}
          />
          {errors.CPF && <span className="error">{errors.CPF}</span>}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor={`agro-${type}-name`}>
            {" "}
            Nome do Produtor{" "}
          </Form.Label>
          <Form.Control
            type="text"
            id={`agro-${type}-cpf`}
            placeholder={"Digite o nome do produtor"}
            value={client.client_name}
            onChange={(e) => {
              addNewClient((prev) => {
                return { ...prev, client_name: e.target.value };
              });
            }}
          />
          {errors.client_name && <span className="error">{errors.client_name}</span>}
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Label htmlFor={`agro-${type}-farm`}> Nome da Fazenda </Form.Label>
        <Form.Control
          type="text"
          id={`agro-${type}-farm`}
          placeholder={"Digite o nome da fazenda"}
          value={client.farm_name}
          onChange={(e) => {
            addNewClient((prev) => {
              return { ...prev, farm_name: e.target.value };
            });
          }}
        />
        {errors.farm_name && <span className="error">{errors.farm_name}</span>}
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            as="select"
            disabled={!selectedState || loading}
            value={client.city}
            onChange={(e) => {
              addNewClient((prev) => {
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
          {errors.city && <span className="error">{errors.city}</span>}
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Estado</Form.Label>
          <Form.Control
            as="select"
            id={`agro-${type}-uf`}
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
          {errors.state && <span className="error">{errors.state}</span>}
        </Form.Group>
      </Row>
      <Form.Group controlId="formTotalArea">
        <Form.Label>Área total em hectares da fazenda</Form.Label>
        <Form.Control
          type="number"
          placeholder="Digite a área total em hectares"
          value={client.total_area}
          onChange={(e) => {
            addNewClient((prev) => {
              return { ...prev, total_area: e.target.value };
            });
          }}
        />
        {errors.total_area && <span className="error">{errors.total_area}</span>}
      </Form.Group>
      <Form.Group controlId="formAgriculturalArea">
        <Form.Label>Área agricultável em hectares</Form.Label>
        <Form.Control
          type="number"
          placeholder="Digite a área agricultável em hectares"
          value={client.useful_area}
          onChange={(e) => {
            addNewClient((prev) => {
              return { ...prev, useful_area: e.target.value };
            });
          }}
        />
        {errors.useful_area && <span className="error">{errors.useful_area}</span>}
      </Form.Group>
      <Form.Group controlId="formVegetationArea">
        <Form.Label>Área de vegetação em hectares</Form.Label>
        <Form.Control
          type="number"
          placeholder="Digite a área de vegetação em hectares"
          value={client.vegetation_area}
          onChange={(e) => {
            addNewClient((prev) => {
              return { ...prev, vegetation_area: e.target.value };
            });
          }}
        />
        {errors.vegetation_area && <span className="error">{errors.vegetation_area}</span>}
      </Form.Group>
      <Form.Group controlId="formCrops">
        <Form.Label>Culturas plantadas</Form.Label>
        <Form.Control
          as="select"
          value={client.crops}
          onChange={(e) => {
            addNewClient((prev) => {
              return { ...prev, crops: e.target.value };
            });
          }}
        >
          <option value={0}> {client.crops} </option>
          <option value={1}>Soja</option>
          <option value={2}>Milho</option>
          <option value={3}>Algodão</option>
          <option value={4}>Café</option>
          <option value={5}>Cana de Açúcar</option>
        </Form.Control>
        {errors.crops && <span className="error">{errors.crops}</span>}
      </Form.Group>
      <Button variant="primary" onClick={submitClient}> Enviar </Button>
    </Form>
  );
};

export default FarmForm;
