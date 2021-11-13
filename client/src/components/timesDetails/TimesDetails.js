import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import Navbar from "../navbar/Navbar";

class TimesDetails extends React.Component {
  state = {
    entry: {},
  };

  componentDidMount() {
    axios.get(`/zeiten/${this.props.match.params.id}`).then((resp) => {
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
    //let startD = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    return d.toLocaleDateString();
  }

  render() {
    if (this.state.loading) {
      return <div>Inhalte werden geladen.</div>;
    }

    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col className="card details">
              <h2>Datum: {this.state.entry.date}</h2>
              {/* <h4>Projekt: {this.state.entry.project.name}</h4> */}
              {/* <h4>
                Projektnummer:{" "}
                {this.state.entry.project.projectCode
                  ? this.state.entry.project.projectCode
                  : "/"}
              </h4> */}

              {/* <h4>
                Kommentar:
                {this.state.entry.comment ? this.state.entry.comment : "/"}
              </h4> */}
              <h4>{this.state.entry.isDeducted ? "Abgerechnet" : ""}</h4>
              <div className="btn-container">
                <Link
                  to={`/zeiten/${this.state.entry._id}/bearbeiten`}
                  className="edit"
                >
                  Bearbeiten
                </Link>
                <Link
                  to={`/zeiten/${this.state.entry._id}/loeschen`}
                  className="delete"
                >
                  Löschen
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TimesDetails;
