import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabset from './Components/TabSet';
import FarmForm from './Components/ClientForm';

import "./bootstrap.css";



function App(){
  return <>
    <Container fluid>
      <Row>
        <Col className = "agro-side-bar" xs={3}> 
          <FarmForm type = {"create"}/>
        </Col>
        <Col className = "agro-main-panel" xs={9}> 
          <Tabset></Tabset>
        </Col>
      </Row>
    </Container>
  </>
}

export default App
