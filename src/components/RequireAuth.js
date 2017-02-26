import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import firebase from 'firebase';

export default function(WrappedComponent) {
  class Auth extends React.Component {
      constructor(props) {
        super(props);
        this.state = { uid: null }
      }
    componentWillMount() {
      if (!this.props.authenticated) {
        let hasLocalStorageUser = false;

        for (let key in localStorage) {
          if (key.startsWith("firebase:authUser:")) {
            hasLocalStorageUser = true;
            const value = JSON.parse(localStorage.getItem(key));

            console.log(value.uid, 'hey a value');
            this.setState({ uid: value.uid })

          }
        }

        // for (let value in localStorage) {
        //     if value.startsWith("uid") {
        //         console.log(value, 'value');
        //     }
        // }

        if (!hasLocalStorageUser) {
          browserHistory.push('/');
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect(mapStateToProps)(Auth);
}
