import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import Loading from "../loading/Loading";

import Navbar from "../navbar/Navbar";

class ProjectDetails extends React.Component {
  state = {
    project: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios.get(`/api/v1/projekte/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        project: resp.data,
        loading: false,
      });
    });
  }

  showDate() {
    let d = new Date(this.state.project.startDate);
    return d.toLocaleDateString();
  }

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col className="card project-details">
              <div>
                <div className="line">
                  <h4 className="line-title">Projekt: </h4>
                  <h4>{this.state.project.name}</h4>
                </div>

                <div className="line">
                  <h4 className="line-title">Projektnr.: </h4>
                  {/* <h4>
                    {this.state.project.projectCode
                      ? this.state.project.projectCode
                      : "/"}
                  </h4> */}
                </div>

                <div className="line">
                  <h4 className="line-title">Beginn: </h4>
                  <h4>{this.showDate(this.state.startDate)}</h4>
                </div>

                <div className="line">
                  <h4 className="line-title">Kommentar: </h4>
                  <h4>
                    {this.state.project.comment
                      ? this.state.project.comment
                      : "/"}
                  </h4>
                </div>
              </div>

              <div className="project-btn-container">
              <Button className="project-btn">
                <Link
                  to={`/projekte/${this.state.project._id}/bearbeiten`}
                  className="edit"
                >
                  Bearbeiten
                </Link>
                </Button>
                <Button className="project-btn">
                <Link
                  to={`/projekte/${this.state.project._id}/loeschen`}
                  className="edit"
                >
                  Löschen
                </Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProjectDetails;
