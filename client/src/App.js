import { Container, Row, Col } from "react-bootstrap";

import Questions from "./components/Questions";

import './App.css';

function App() {

  return (
    <Container
      fluid
      className="KnowledgeCheckBlocks justify-content-md-center"
    >
      <Row>
        <Col>
          <h1>Knowledge Check Blocks</h1>
        </Col>
      </Row>

      <Questions />
    </Container>
  );
}

export default App;
