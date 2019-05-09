import React, {Component} from 'react';
import './App.css';
import AuthGateway from './AuthGateway/AuthGateway';
import {Switch, Route, Link } from 'react-router-dom';
import DrinkContainer from './DrinkContainer/DrinkContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      currentUser: null
    }
  }
  componentDidMount(){
    this.checkForUser()
  }
  checkForUser = async () => {
    const currentUser = await fetch("http://localhost:9000/users/current", {
      credentials: 'include'
    })
    const parsedResponse = await currentUser.json();
    if(parsedResponse.status === 200){
      this.setState({
        loggedIn: true,
        currentUser: parsedResponse.data
      })
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
  handleLogin = async (formData) => {
    console.log(formData)
    try {
      const loginResponse = await fetch("http://localhost:9000/users/login", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedLoginResponse = await loginResponse.json();
      console.log(parsedLoginResponse);
      if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse.data
        })
      } else {
        console.log("Jake says you screwed up dummy!")
      }

    } catch(err){
      console.log(err)
    }
  }
  render(){
    return (
      <div className="App">
        {this.state.loggedIn ? 
        <Switch>
          <Route exact path="/" component={DrinkContainer} />
          <Route path="/drinks" component={DrinkContainer} />
        </Switch>
      :
        <AuthGateway handleLogin={this.handleLogin} handleRegister = {this.handleRegister}></AuthGateway>}
      </div>
    );
  }
}

export default App;
