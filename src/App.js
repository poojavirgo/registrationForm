import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import RegistrationApp from '../src/registrationForm/registrationForm';
class App extends Component {

  state={
    data:{}
  }

  componentDidMount(){
    //GETing all the data from the firebase
    axios.get("https://registrationapp-79c99.firebaseio.com/data.json")
    .then(response => {
      console.log(response);
      this.setState({
        data: response.data,
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
       <RegistrationApp data={this.state.data}/>
      </div>
    );
  }
}

export default App;
