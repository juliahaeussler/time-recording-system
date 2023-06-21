import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";

import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";

class TimesDetails extends React.Component {
  state = {
    entry: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios.get(`/api/v1/zeiten/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        entry: resp.data,
        loading: false,
        error: false,
      });
    });
  }

  showDate() {
    let d = new Date(this.state.entry.date);
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
                  <h4>{this.state.entry.project.name}</h4>
                </div>

                <div className="line">
                  <h4 className="line-title">Projektnr.: </h4>
                  {/* <h4>
                    {this.state.entry.project.projectCode
                      ? this.state.entry.project.projectCode
                      : "/"}
                  </h4> */}
                </div>

                <div className="line">
                  <h4 className="line-title">Beginn: </h4>
                  <h4>{this.showDate(this.state.entry.date)}</h4>
                </div>

                <div className="line">
                  <h4 className="line-title">VerfasserIn: </h4>
                  <h4>
                    {this.state.entry.author.name
                      ? this.state.entry.author.name
                      : "/"}
                  </h4>
                </div>

                <div className="line">
                  <h4 className="line-title">Kommentar: </h4>
                  <h4>
                    {this.state.entry.comment
                      ? this.state.entry.comment
                      : "/"}
                  </h4>
                </div>
              </div>

              <div className="project-btn-container">
              <Button className="project-btn">
                <Link
                  to={`/zeiten/${this.state.entry._id}/bearbeiten`}
                  className="edit"
                >
                  Bearbeiten
                </Link>
                </Button>
                <Button className="project-btn">
                <Link
                  to={`/zeiten/${this.state.entry._id}/loeschen`}
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

export default TimesDetails;
