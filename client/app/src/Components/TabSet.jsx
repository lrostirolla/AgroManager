import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { SubmitButtons } from './SubmitButtons';
import { Form, Row, Col } from 'react-bootstrap';
import FarmForm from './ClientForm';
import ClientInfo from './ClientTable';
import { globals } from '../globals';

function Tabset() {

  return (
    <Tabs  id = "agro-tab" className="mb-3 agro-tab-set" activeKey={"client"} onSelect={(k) => setKey(k)} >
      <Tab eventKey="client" title="Cliente">
        <div className='agro-edit-client'> 
          <SubmitButtons  />
          <div className='agro-edit-content'>
            <Row>
              <Col xs={3}>
                <Form.Label htmlFor={`agro-cpf`}> CPF/CNPJ </Form.Label>
                <Form.Control  type="text" id={`agro-cpf`} placeholder={"Digite o CPF/CNPJ do Cliente"}  onChange = {
                  (e) => {
                    globals["fetchCPF"] = e.target.value;
                  }
                }/> 
              </Col>
              <Col xs={9}>
                <FarmForm type = {"edit"}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <ClientInfo/>
              </Col>
            </Row>
          </div>
        </div>
      </Tab>
      <Tab eventKey="infographcs" title="Gráficos">
        <div className='agro-edit-content'></div>
      </Tab>
    </Tabs>
  );
}

export default Tabset;