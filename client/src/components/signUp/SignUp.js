import React from 'react'
import axios from 'axios'
import './SignUp.css'


class SignUp extends React.Component {

  state = {
    username: '',
    password: '',
    name: '',
    rate: '',
    isAdmin: false,
    isActive: false,
  }

 
  changeHandler = (e) => {
    let currentName = e.target.name
    let newState = {}
    newState[currentName] = e.target.value 
    this.setState(newState)
  }

  checkboxChangeHandler = (e) => {
    let currentName = e.target.name 
    let newState = {}
    newState[currentName] = e.target.checked
    this.setState(newState)
  }

  submitHandler = () => {
    console.log({ username: this.state.username, password: this.state.password, name: this.state.name, rate: this.state.rate, isAdmin: this.state.isAdmin, isActive: this.state.isActive })
    axios.post('/signup', { username: this.state.username, password: this.state.password, name: this.state.name, rate: this.state.rate, isAdmin: this.state.isAdmin, isActive: this.state.isActive }).then((res) => {
      alert(res.data.message)
    })

  }

  render() {
    return (
      <div className="signup-form" >
        <h3>Benutzer anlegen</h3> 

        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Benutzername" />
        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Passwort" />
        <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Nachname, Vorname" />
        <input type="number" name="rate" value={this.state.rate} onChange={this.changeHandler} placeholder="Stundensatz" />

        <div>
        <input type="checkbox" name="isAdmin" id="isAdmin" checked={this.state.isAdmin} onChange={this.checkboxChangeHandler} />
        <label htmlFor="isAdmin">Administrator</label>
        </div>

        <div>
        <input type="checkbox" name="isActive" id="isActive" checked={this.state.isActive} onChange={this.checkboxChangeHandler} />
        <label htmlFor="isActive">Aktiv</label>
        </div>

        <button className="signup-button" onClick={this.submitHandler}>Benutzer anlegen</button>
      </div>
    );
  }
}

export default SignUp;