import React from "react";
//import axios from "axios";
import { Container, Row, Col, Card } from "reactstrap";
import Navbar from "../navbar/Navbar";


class test extends React.Component {
  render() {
 
    return (
      <div>
        <Container>
          <Row>
            <Navbar />
          </Row>

          <Row>
            <Col>
              <Card border="info" style={{ width: "18rem" }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>Info Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card border="info" style={{ width: "18rem" }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>Info Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default test;
