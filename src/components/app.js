import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { paths } from '../routes';
import AllRiversList from './AllRiversList';
import SelectedRiversList from './SelectedRiversList';
import LoginForm from './LoginForm';

class App extends Component {

  // componentWillReceiveProps(nextProps) {
  //   const { router } = this.context;
  //
  //   if (authenticated && !nextProps.authenticated) {
  //     router.replace(paths.SIGN_IN);
  //   }
  //   else if (!authenticated && nextProps.authenticated) {
  //     router.replace(paths.TASKS);
  //   }
  // }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.auth.user};
}

export default connect(mapStateToProps)(App);
