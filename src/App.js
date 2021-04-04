import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './App.css';

import Todo from './components/Todo';
function App() {
  return (
    <Container>
      <Row style={{ 'padding-top': '40px' }}>
        <Col md='12'>
          <Card>
            <Card.Header className='cardHeader'>
              To-Do List App With React
            </Card.Header>
            <Card.Body>
              <Todo />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
