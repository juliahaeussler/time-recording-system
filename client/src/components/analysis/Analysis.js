import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Table } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";
//import numeral from "numeral";

class Analysis extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],
    users: [],
    entries: [],

    loading: true,
    error: false,
    analysis: false,

    projectName: "",
    projectCode: "",
    startDate: "",
    isArchived: false,
    projectId: "",
    projectComment: "",
    totalHours: "",
    totalMinutes: "",
    totalEur: "",
    totalOpen: "",
    totalDeduct: "",
  };

  componentDidMount() {
    axios.get("/benutzer").then((resp) => {
      this.updateEntries(resp.data);
    });
    axios
      .get("/projekte")
      .then((resp) => {
        let newData = resp.data.map((e) => {
          return {
            value: e.name,
            id: e._id,
            label: e.name,
            isArchived: e.isArchived,
            projectCode: e.projectCode,
            startDate: e.startDate,
            name: e.name,
            comment: e.comment,
          };
        });
        this.setState({
          projects: newData,
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        console.log("loading projects failed");
        this.setState({
          error: true,
        });
      });
  }

  updateEntries = (data) => {
    this.setState({
      users: data,
    });
  };

  handleCheckboxChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.checked;
    this.setState(newState);
    console.log(this.state.isArchived);
  };

  handleNameChange = (selectedItem) => {
    this.setState({
      projectName: selectedItem.name,
      projectId: selectedItem.id,
      projectCode: selectedItem.projectCode,
      projectComment: selectedItem.comment,
      startDate: selectedItem.startDate,
    });
  };

  handleChange = (e) => {
    let currentName = e.target.name;
    let newState = {};
    newState[currentName] = e.target.value;
    this.setState(newState);
  };

  //show entries of certain project:
  // 1. chronologically
  // 2. by employees
  //show entries of a certain employee:
  //(default: all projects, option: select 1 or more project)
  //(option: sort by servicePhase)
  // 1. of one week (past week? clarify)
  // 2. of one month

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/auswertung/${this.state.projectId}`)
      .then((projectEntries) => {
        //SUM TOTAL TIME:
        //REDUCER instead of FOREACH
        let hours = projectEntries.data.map(
          ({ timespanHours }) => timespanHours
        );
        let sumH = 0;
        hours.forEach((hour) => {
          sumH += hour;
        });
        let mins = projectEntries.data.map(({ timespanMins }) => timespanMins);
        let sumM = 0;
        mins.forEach((min) => {
          sumM += min;
        });
        let restHours = Math.floor(sumM / 60);
        let restMinutes = sumM % 60;

        //SUM TOTAL EUR
        let entrySums = projectEntries.data.map(({ entrySum }) => entrySum);
        let totalEur = 0;
        entrySums.forEach((eur) => {
          totalEur += eur;
        });

        //SUM OPEN EUR
        let entriesOpenSums = projectEntries.data.filter(
          (time) => time.isDeducted === false
        );
        let openSums = entriesOpenSums.map(({ entrySum }) => entrySum);
        let totalOpen = 0;
        openSums.forEach((eur) => {
          totalOpen += eur;
        });

        //SUM DEDUCTED EUR
        let entriesDeductSums = projectEntries.data.filter(
          (time) => time.isDeducted === true
        );
        let deductSums = entriesDeductSums.map(({ entrySum }) => entrySum);
        let totalDeduct = 0;
        deductSums.forEach((eur) => {
          totalDeduct += eur;
        });

        //var string = numeral(totalEur).format('0,0').split(",").join(".");

        this.setState({
          entries: projectEntries.data,
          totalHours: sumH + restHours,
          totalMinutes: restMinutes,
          totalEur: totalEur.toFixed(2) + "€",
          totalOpen: totalOpen.toFixed(2) + "€",
          totalDeduct: totalDeduct.toFixed(2) + "€",
          analysis: true,
        });
      })
      .catch((error) => {
        console.log("submitting failed", error);
        this.setState({
          error: true,
        });
      });
  };

  showDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
  }

  sortNewToOld = () => {
    let sorted = this.state.entries.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });
    this.setState({
      entries: sorted,
    });
  };

  sortOldToNew = () => {
    let sorted = this.state.entries.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d - c;
    });
    this.setState({
      entries: sorted,
    });
  };

  sortOpenFirst = () => {
    let sorted = this.state.entries.sort(function compare(entry) {
      if (entry.isDeducted === true) return 1;
      if (entry.isDeducted === false) return -1;
    });
    this.setState({
      entries: sorted,
    });
  };

  sortByEmployee = () => {
    let sorted = this.state.entries.sort(function compare(a, b) {
      if (a.author.name > b.author.name) return 1;
      if (a.author.name < b.author.name) return -1;
    });
    this.setState({
      entries: sorted,
    });
  };

  filterUsers = (event) => {
    this.setState({
      entries: this.state.entries.filter((e) => {
        return e.author.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }),
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
          <Row className="one-card">
            <Col>
              <div className="card">
                <div>
                  <form onSubmit={this.handleSubmit} className="form-card">
                    <label htmlFor="projectName">Projektname</label>
                    <Select
                      options={this.state.projects}
                      onChange={this.handleNameChange}
                      className="project-input"
                    />

                    <label htmlFor="projectCode">Projektnummer</label>
                    <input
                      type="text"
                      name="projectCode"
                      value={this.state.projectCode}
                      onChange={this.handleChange}
                    />

                    <div className="input-group">
                      <input
                        type="checkbox"
                        name="isArchived"
                        id="isArchived"
                        checked={this.state.isArchived}
                        onChange={this.handleCheckboxChange}
                      />
                      <label htmlFor="isActive">
                        Archivierte Projekte einschließen
                      </label>
                    </div>

                    <div className="btn-container">
                      <Button className="button login-btn" type="submit">
                        Auswertung
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="card">
                <div className="sort-container">
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={this.sortNewToOld}
                  >
                    Datum (Älteste zuerst)
                  </button>
                  <button className="sort-btn" onClick={this.sortOldToNew}>
                    Datum (Neueste zuerst)
                  </button>
                  <button className="sort-btn" onClick={this.sortOpenFirst}>
                    Offene Einträge zuerst
                  </button>
                  <button className="sort-btn" onClick={this.sortByEmployee}>
                    MitarbeiterInnen
                  </button>
                  <input
                    className="sort-btn"
                    onChange={this.filterUsers}
                    placeholder="Nach MitarbeiterIn suchen"
                  ></input>
                </div>

                {this.state.analysis && (
                  <div>
                    <div>
                      <div className="line"><h5 className="line-title">Projekt: </h5><h5>{this.state.projectName}</h5></div>
                      <div className="line"><h5 className="line-title">Projektnr.: </h5><h5>{this.state.projectCode}</h5></div>
                      <div className="line"><h5 className="line-title">Beginn: </h5><h5>{this.showDate(this.state.startDate)}</h5></div>
                      <div className="line"><h5 className="line-title">Kommentar: </h5><h5>{this.state.projectComment}</h5></div>
                    </div>

                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Datum</th>
                          <th>Mitarbeiter</th>
                          <th>Leistungsphase</th>
                          <th>Kommentar</th>
                          <th>Std</th>
                          <th>Min</th>
                          <th>Stundensatz</th>
                          <th>Summe netto</th>
                          <th>abgerechnet</th>
                          <th>offen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.entries.map((entry) => {
                          return (
                            <tr key={entry._id}>
                              <td>{this.showDate(entry.date)}</td>
                              <td>{entry.author.name}</td>
                              <td>{entry.servicePhase}</td>
                              <td>{entry.comment}</td>
                              <td>{entry.timespanHours}</td>
                              <td>{entry.timespanMins}</td>
                              <td>{entry.rate.toFixed(2)}€</td>
                              <td>{entry.entrySum.toFixed(2)}€</td>
                              <td>{entry.isDeducted ? "✓" : ""}</td>
                              <td>{entry.isDeducted ? "" : "✓"}</td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Summe:</td>
                          <td>{this.state.totalHours}</td>
                          <td>{this.state.totalMinutes}</td>
                          <td></td>
                          <td>{this.state.totalEur}</td>
                          <td>{this.state.totalDeduct}</td>
                          <td>{this.state.totalOpen}</td>
                        </tr>
                      </tbody>
                    </Table>
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

export default Analysis;
