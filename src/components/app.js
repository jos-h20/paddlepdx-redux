import React, { Component } from 'react';
import firebase from 'firebase';
import AllRiversList from './AllRiversList';
import SelectedRiversList from './SelectedRiversList';
import LoginForm from './LoginForm';

class App extends Component {

  componentWillMount() {
  //   const config = {
  //     apiKey: "AIzaSyCJxCW7ht2UzdP8d1JjYMLDQbkof-Jv5Y0",
  //     authDomain: "paddle-redux.firebaseapp.com",
  //     databaseURL: "https://paddle-redux.firebaseio.com",
  //     storageBucket: "paddle-redux.appspot.com",
  //     messagingSenderId: "261772544888"
  // };
  // firebase.initializeApp(config);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


export default App;
