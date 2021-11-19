import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Container, Row, Col, Button, Table } from "reactstrap";
import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";
import Config from "../../configs";
import Pen from "./pen.png";

class Times extends React.Component {
  state = {
    currentUser: this.props.user,
    entries: [],
    projects: [],
    loading: true,
    error: false,

    projectName: "",
    projectId: "",
    //set default input value to current date: (in format yyyy-mm-dd)
    date: new Date().toISOString().split("T")[0],
    timespanHours: "",
    timespanMins: "00",
    servicePhase: "",
    comment: "",
  };

  updateEntries = (data) => {
    this.setState({
      entries: data,
    });
  };

  clearForm = () => {
    this.setState({
      projectName: "",
      timespanHours: "",
      timespanMins: "",
      servicePhase: "",
      comment: "",
    });
  };

  componentDidMount() {
    axios.get("/api/v1/zeiten").then((resp) => {
      this.updateEntries(resp.data);
    });
    axios.get("/api/v1/projekte").then((resp) => {
      let newData = resp.data.map((e) => {
        return {
          value: e.name,
          id: e._id,
          label: e.name,
          name: e.name,
        };
      });
      this.setState({
        projects: newData,
        loading: false,
        error: false,
      });
    });
  }

  handleNameChange = (selectedItem) => {
    this.setState({
      projectName: selectedItem.name,
      projectId: selectedItem.id,
    });
  };

  handleChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  handleStageChange = (selectedStage) => {
    this.setState({
      servicePhase: selectedStage.label,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    let project = this.state.projects.find(
      (project) => project.name === this.state.projectName
    );
    if (!project) {
      return;
    }
    axios
      .post("/api/v1/zeiten", {
        project: this.state.projectId,
        date: this.state.date,
        timespanHours: this.state.timespanHours,
        timespanMins: this.state.timespanMins,
        servicePhase: this.state.servicePhase,
        comment: this.state.comment,
      })
      .then((resp) => {
        console.log(resp.data);
        this.updateEntries(this.state.entries.concat([resp.data]));
        this.clearForm();
      })
      .catch((error) => {
        console.log("adding time entry failed");
        this.setState({
          error: true,
        });
      });
  };

  showDate(entry) {
    let d = new Date(entry.date);
    return d.toLocaleDateString();
  }

  showServicePhase(entry) {
    let s = entry.servicePhase;
    return s.split(".")[0];
  }

  showCommentStart(entry) {
    let c = entry.comment;
    return c.slice(0, 16);
  }

  render() {
    let selectedDay = this.state.entries.filter((e) => {
      return e.date.includes(this.state.date);
    });

    if (this.state.loading) {
      return <Loading></Loading>;
    }

    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col>
              <div className="card">
                <h3 className="h3Style">
                  <span>Neue Zeit erfassen:</span>
                </h3>

                <form onSubmit={this.handleFormSubmit} className="form-card">
                  <label htmlFor="projectName">Projektname</label>
                  <Select
                    options={this.state.projects}
                    onChange={this.handleNameChange}
                    placeholder="Auswählen..."
                    className="project-input"
                  />

                  <div className="date-time-container">
                    <div className="date-time">
                      <label htmlFor="date">Datum</label>
                      <div>
                      <input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                      />
                      </div>
                    </div>

                    <div className="date-time">
                      <label htmlFor="timespanHours">Dauer (h/min)</label>
                      <div className="time-input">
                      <input
                        type="number"
                        name="timespanHours"
                        max="24"
                        value={this.state.timespanHours}
                        onChange={this.handleChange}
                      />
                      <input
                        list="minutes"
                        type="number"
                        name="timespanMins"
                        value={this.state.timespanMins}
                        onChange={this.handleChange}
                      />
                      <datalist id="minutes">
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                      </datalist>
                      </div>
                    </div>
                  </div>

                  <label htmlFor="servicePhase">Leistungsphase</label>
                  <Select
                    options={Config.servicePhases}
                    onChange={this.handleStageChange}
                    placeholder="Auswählen..."
                  /><br></br>

                  <label htmlFor="comment">Kommentar</label>
                  <textarea
                    type="text"
                    name="comment"
                    rows="5"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />

                  <div className="btn-container">
                    <Button type="submit" className="button">
                      Zeiteintrag hinzufügen
                    </Button>
                  </div>
                  {this.state.error && (
                    <div className="alert alert-danger" role="alert">
                      Eintrag wurde nicht gespeichert, bitte erneut versuchen.
                    </div>
                  )}
                </form>
              </div>
            </Col>
            <Col>
              <div className="card">
                <h3 className="h3Style">
                  <span>
                    Erfasste Zeiten vom{" "}
                    {this.state.date.split("-").reverse().join(".")}:
                  </span>
                </h3>

                <Table striped bordered hover>
                  <thead className="thead">
                    <tr>
                      <th>Datum</th>
                      <th>Projekt</th>
                      <th>LP</th>
                      <th>Dauer</th>
                      <th>Kommentar</th>
                      <th>Bearbeiten</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedDay.map((entry) => {
                      return (
                        <tr key={entry._id}>
                          <td>{this.showDate(entry)}</td>
                          <td>{entry.project.name}</td>
                          <td>{this.showServicePhase(entry)}</td>
                          <td>
                            {entry.timespanHours}:
                            {entry.timespanMins === 0
                              ? "00"
                              : entry.timespanMins}
                          </td>
                          <td>
                            {entry.comment
                              ? this.showCommentStart(entry) + "..."
                              : "/"}
                          </td>
                          <td>
                            <Link to={`/zeiten/${entry._id}`}>
                              <img className="pen-img" src={Pen} alt="Pen" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Times;
