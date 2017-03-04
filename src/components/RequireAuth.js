import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


export default function(WrappedComponent) {
  class Auth extends React.Component {

    constructor(...props) {
      super(...props);

      this.state = { hasLocalStorageUser: false };
    }

    componentWillMount() {
        console.log(this.props.user, "props user")
      if (!this.props.user) {

         // setState() is not synchronous, so we need still another variable to
         // keep track of whether we've found a user in localStorage
        let hasLocalStorageUser = false;

        for (let key in localStorage) {
          if (key.startsWith("firebase:authUser:")) {
            hasLocalStorageUser = true;
            this.setState({ hasLocalStorageUser: true });
          }
        }

        if (!hasLocalStorageUser) {
          browserHistory.push('/login');
        }
      }
    }


    render() {
      return this.state.hasLocalStorageUser || this.props.user
        ? <WrappedComponent {...this.props} />
        : <div />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user};
  }

  return connect(mapStateToProps)(Auth);
}
