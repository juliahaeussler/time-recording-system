import React from 'react'
import axios from 'axios'
import './LogIn.css'

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }


  changeHandler = (e) => {
    let currentName = e.target.name

    let newState = {}
    newState[currentName] = e.target.value 

    this.setState(newState)
  }

  // class property syntax
  submitHandler = () => {

    axios.post('/login', { username: this.state.username, password: this.state.password }).then((resp) => {

      let data = resp.data

      let message = data.message
      let user = data.user

      this.props.logInTheUser(user)

      //alert('Benutzer angemeldet')
    })

  }


  render() {

    return (
      <div className="login-form" >
        
        <h3>Anmelden</h3>
        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Benutzername" />
        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Passwort" />
        <button onClick={this.submitHandler}>Anmelden</button>
      </div>
    );
  }

}

export default Login;