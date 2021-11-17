import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Table } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Navbar from "../navbar/Navbar";

class Analysis extends React.Component {
  state = {
    currentUser: this.props.user,
    projects: [],
    users: [],
    entries: [],

    loading: true,
    error: false,

    projectName: "",
    projectCode: "",
    startDate: "",
    isArchived: false,
    projectId: "",
    projectComment: "",
    totalHours :"",
    totalMinutes:''

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

  clearForm = () => {
    this.setState({
      projectName: "",
      projectCode: "",
    
    });
  };




  filterUsers = (event)=>{



    this.setState({
      entries: this.state.entries.filter(e=>{
        return e.author.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
    })
  }

  

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

        //REDUCER instead of FOREACH
        let hours = projectEntries.data.map(({ timespanHours }) => timespanHours)
        let sumH = 0
        hours.forEach((hour) => {
          sumH+=hour
        })
        let mins = projectEntries.data.map(({ timespanMins }) => timespanMins)
        let sumM = 0
        mins.forEach((min) => {
          sumM+=min
        })
        let restHours =  Math.floor( sumM/ 60)
        let restMinutes = sumM % 60
        
        this.setState({
          entries: projectEntries.data,
          totalHours: sumH +restHours,
          totalMinutes:restMinutes
        });
       
        this.clearForm();
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
    //let startD = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    return d.toLocaleDateString();
  
  }

  sortDate =()=>{
    let sorted = this.state.entries.sort(function(a,b){
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c-d;
  
    })
    console.log("sorted",sorted)
    this.setState({
      entries:sorted
    }) 
  }

  calcEach(rate, hours, mins) {
    let time = hours + (mins/60)
    
    return rate*time
  }







  render() {
    if (this.state.loading) {
      return <div>Inhalte werden geladen.</div>;
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

                    <div>Einträge sortieren -Datum -nach Mitarbeitern</div>

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
                <div>
                  {/* <div className="">
                    <input
                      type="radio
                      name="sortDate"
                      id="isArchived"
                      checked={this.state.isArchived}
                      onChange={this.handleCheckboxChange}
                    />
                    <label htmlFor="isActive">
                      Archivierte Projekte einschließen
                    </label>



                  </div> */}
                </div>
               
                  <button onClick={this.sortDate}>sort me </button>

                  <input onChange={this.filterUsers} ></input>
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
                      <td>{entry.rate}</td>
                      <td>{this.calcEach(entry.rate, entry.timespanHours, entry.timespanMins )}</td>
                      <td>{entry.isDeducted
                              ? "✓"
                              : ""}</td>
                      <td>{entry.isDeducted
                              ? ""
                              : "✓"}</td>
                    </tr>
                    )
                })}
                
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  
                 
                  <td>{this.state.totalHours}</td>
                  <td>{this.state.totalMinutes}</td>
                  <td>Summe</td>
                  <td>Summe</td>
                </tr>
                  
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

export default Analysis;



  

