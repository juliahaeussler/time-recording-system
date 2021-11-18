import React from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Loading from "../loading/Loading";

import Navbar from "../navbar/Navbar";

class ProjectDelete extends React.Component {
  state = {
    project: {},
    error: false,
    loading: true,
  };

  componentDidMount() {
    axios.get(`/projekte/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        project: resp.data,
        loading: false,
      });
    });
  }

  handleDelete = () => {
    console.log("props", this.props.match.params.id);

    axios
      .delete(`/projekte/${this.props.match.params.id}/loeschen`)
      .then((resp) => {
        this.setState({
          error: false,
        });
        this.props.history.push("/projekte");
      })
      .catch((error) => {
        console.log("removing failed");
        this.setState({
          error: true,
        });
      });
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
          <Col>
            <div className="card details">
              <h4>
                Projekt{" "}
                <span className="project-name">{this.state.project.name}</span>{" "}
                endgültig löschen?
              </h4>
              <div className="btn-container">
                <button className="delete" onClick={this.handleDelete}>
                  Löschen
                </button>
                
              </div>
              {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    Projekt konnte nicht gelöscht werden, bitte erneut versuchen.
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

export default ProjectDelete;
