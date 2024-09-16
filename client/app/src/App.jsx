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
      <Tabset></Tabset>
    </Container>

  </>
}

export default App
