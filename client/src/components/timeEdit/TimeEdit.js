import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import Navbar from "../navbar/Navbar";
import Loading from "../loading/Loading";

class TimeEdit extends React.Component {
  state = {
    project: {},
    error: false,
    loading: true,

    date: "",
    timespanHours: "",
    timespanMins: "",
    comment: "",
    isDeducted: false,
    rate: "",
    servicePhase: ""
  };

  componentDidMount() {
    axios.get(`/api/v1/zeiten/${this.props.match.params.id}`).then((resp) => {
      console.log(resp.data);
      this.setState({
        date: resp.data.date,
        timespanHours: resp.data.timespanHours,
        timespanMins: resp.data.timespanMins,
        comment: resp.data.comment,
        isDeducted: resp.data.isDeducted,
        rate: resp.data.rate,
        servicePhase: resp.data.servicePhase,
        
        error: false,
        loading: false,
      });
    });
  }

  formatDate(date) {
    return date.split("T")[0]
  }

  handleChange = (event) => {
    let currentName = event.target.name;
    this.setState({
      ...this.state,
      [currentName]: event.target.value,
    });
  };

  handleCheckboxChange = (e) => {
    let currentName = e.target.name;
    this.setState({
      ...this.state,
      [currentName]: e.target.checked,
    })
  };



  handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`/api/v1/zeiten/${this.props.match.params.id}/bearbeiten`, {
        date: this.state.date,
        timespanHours: this.state.timespanHours,
        timespanMins: this.state.timespanMins,
        comment: this.state.comment,
        isDeducted: this.state.isDeducted,
        rate: this.state.rate,
        servicePhase: this.state.servicePhase,
      })
      .then((resp) => {
        this.props.history.push(`/zeiten/${this.props.match.params.id}`);
      })
      .catch((error) => {
        console.log("editing failed");
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
            <Col className="one-card">
              <div className="card edit-card">
              <h3 className="h3Style">
                  <span>Zeiteintrag bearbeiten:</span>
                </h3>
                <form onSubmit={this.handleEditSubmit} className="form-card">
                <div className="date-time-container">
                    <div className="date-time">
                      <label htmlFor="date">Datum</label>
                      <div>
                      <input
                        type="date"
                        name="date"
                        value={this.formatDate(this.state.date)}
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
                  <label htmlFor="servicePhase">Leistungsphase:</label>
                  <input
                    type="text"
                    name="servicePhase"
                    id="servicePhase"
                    value={this.state.servicePhase}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="comment">Kommentar</label>
                  <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                  <div className="input-group">
                    <input
                      type="checkbox"
                      name="isDeducted"
                      id="isDeducted"
                      checked={this.state.isDeducted}
                      onChange={this.handleCheckboxChange}
                    />
                    <label htmlFor="isDeducted">Abgerechnet</label>
                  </div>

                  <div className="btn-container">
                    <Button type="submit" className="button">
                      Änderungen speichern
                    </Button>
                  </div>
                </form>

                {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    Änderungen wurden nicht gespeichert, bitte erneut versuchen.
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

export default TimeEdit;