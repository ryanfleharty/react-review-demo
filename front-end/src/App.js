import React, {Component} from 'react';
import './App.css';
import AuthGateway from './AuthGateway/AuthGateway';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      currentUser: null
    }
  }
  handleRegister = async (formData) => {
    console.log(formData);
    const response = await fetch("http://localhost:9000/users", {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
          "Content-Type": "application/json"
      }
  })
  const parsedResponse = await response.json();
  console.log(parsedResponse);
  if(parsedResponse.status === 200){
      this.setState({
          loggedIn: true,
          currentUser: parsedResponse.data
      })
  }
  }
  render(){
    return (
      <div className="App">
        {this.state.loggedIn ? 
        <h1>YOURE LOGGED IN</h1>
      :
        <AuthGateway handleRegister = {this.handleRegister}></AuthGateway>}
      </div>
    );
  }
}

export default App;
