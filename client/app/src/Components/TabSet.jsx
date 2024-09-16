import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FarmForm from './ClientForm';
import ClientInfo from './ClientTable';
import { addClient } from "../redux/clients/clientSlice";
import { useDispatch, useSelector} from "react-redux";
import { ClientDashBoard } from './ClientDashBoard';




function Tabset() {

  const dispatch = useDispatch();
  const [key, setKey] = useState("client");
  
  const fetchAllClients = async () => {

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/client/get_clients`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  fetchAllClients()
  .then((data) => {
    data.forEach(client => {
      dispatch(addClient(client));
    })
  })
  .catch((e) => {
    console.log(e);
  });




  return (
    <Tabs  id = "agro-tab" className="mb-3 agro-tab-set" activeKey={key} onSelect={(k) => setKey(k)} >
      <Tab eventKey="client" title="Cliente">
        <div className='agro-edit-client'> 
          <div className='agro-edit-content'>
          <FarmForm type = {"create"}/>
          <ClientInfo/>
          </div>
        </div>
      </Tab>
      <Tab eventKey="infographcs" title="Gráficos">
        <div className='agro-edit-content' >
          <ClientDashBoard/>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Tabset;