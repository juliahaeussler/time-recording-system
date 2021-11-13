import React from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

import Navbar from "../navbar/Navbar";

class TimeDelete extends React.Component {
  state = {
    entry: {},
    error: false,
  };

  componentDidMount() {
    axios.get(`/zeiten/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        entry: resp.data,
      });
    });
  }

  handleDelete = () => {
    console.log("props", this.props.match.params.id);

    axios
      .delete(`/zeiten/${this.props.match.params.id}/loeschen`)
      .then((resp) => {
        this.setState({
          error: false,
        });
        this.props.history.push("/zeiten");
      })
      .catch((error) => {
        console.log("removing failed");
        this.setState({
          error: true,
        });
      });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
          <Col>
            <div className="card details">
              <h4>
               Eintrag endgültig löschen?
              </h4>
              <div className="btn-container">
                <button className="delete" onClick={this.handleDelete}>
                  Löschen
                </button>
                
              </div>
              {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    Eintrag konnte nicht gelöscht werden, bitte erneut versuchen.
                  </div>
                )}
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TimeDelete;