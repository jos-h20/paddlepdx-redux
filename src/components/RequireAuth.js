import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


export default function(WrappedComponent) {
  class Auth extends React.Component {

    componentWillMount() {
        console.log(this.props.user, 'here is user');
        if (!this.props.user) {
            console.log('what the hell')
            browserHistory.push('/login');

        // for (let key in localStorage) {
        //     console.log(key, 'key');
        //   if (key.startsWith("firebase:authUser:")) {
        //     hasLocalStorageUser = true;
        //     console.log(key, "key in lstorage")
        //
        //   }
        // }
        //
        // if (!hasLocalStorageUser) {
        //   browserHistory.push('/login');
        // }
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
