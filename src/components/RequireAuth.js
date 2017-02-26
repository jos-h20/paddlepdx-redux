import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


export default function(WrappedComponent) {
  class Auth extends React.Component {

    componentWillMount() {
        if (!this.props.user) {
        let hasLocalStorageUser = false;

        for (let key in localStorage) {
          if (key.startsWith("firebase:authUser:")) {
            hasLocalStorageUser = true;

          }
        }

        if (!hasLocalStorageUser) {
          browserHistory.push('/login');
        }
    }
    }

    componentWillReceiveProps(nextProps) {

        console.log(nextProps, 'yo next props');
      if (authenticated && !nextProps.authenticated) {
          let hasLocalStorageUser = false;

          for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
              hasLocalStorageUser = true;

            }
          }

          if (!hasLocalStorageUser) {
            browserHistory.push('/login');
          }

      }
    }

    render() {
        console.log(this.props, 'whatup')
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user};
  }

  return connect(mapStateToProps)(Auth);
}
