import React from 'react'
import axios from 'axios'
import './SignUp.css'

class SignUp extends React.Component {

  state = {
    username: '',
    password: '',
    name: '',
    rate: '',
    isAdmin: true,
    isActive: true,
  }

  // generic change handler for text input fields
  changeHandler = (e) => {
    let currentName = e.target.name

    let newState = {}
    newState[currentName] = e.target.value // newState['title'] / newState['description']

    this.setState(newState)
  }

  // class property syntax
  submitHandler = () => {

    axios.post('/signup', { username: this.state.username, password: this.state.password, name: this.state.name, rate: this.state.rate, isAdmin: this.state.isAdmin, isActive: this.state.isActive }).then(() => {
      alert('Benutzer hinzugefügt')
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

        <label htmlFor="isAdmin">Administrator</label>
        <input type="checkbox" name="isAdmin" id="isAdmin" value={this.state.isAdmin} onChange={this.changeHandler} />

        <label htmlFor="isActive">Aktiv</label>
        <input type="checkbox" name="isActive" id="isActive" value={this.state.isActive} onChange={this.changeHandler} />

        <button onClick={this.submitHandler}>Benutzer anlegen</button>
      </div>
    );
  }
}

export default SignUp;