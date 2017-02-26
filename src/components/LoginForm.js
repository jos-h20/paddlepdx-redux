import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import { emailChanged, passwordChanged, loginUser, riversFetch, signInSuccess, signInInProgress, signInError, signIn } from '../actions';



class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selRivers: null }
  }
  static contextTypes = {
  router: PropTypes.object
  };

  onEmailChange(event) {
    this.props.emailChanged(event.target.value);
  }

  onPasswordChange(event) {
    this.props.passwordChanged(event.target.value);
  }

  loginUser(event) {
    event.preventDefault();
    const { email, password } = this.props;

    this.props.loginUser({ email, password });

  }

  signIn(event) {
    event.preventDefault();
    const { onSignInClick } = this.props;

    this.props.signIn({ onSignInClick });

  }

  // componentWillMount() {
  //   if (this.props.user) {
  //     this.props.riversFetch();
  //   }
  // }


  // renderButton() {
  //   if (this.props.loading) {
  //     return <div>Loading...</div>;
  //   }
  //   return (
  //     <button onClick={this.onButtonClick.bind(this)}>
  //       Login
  //     </button>
  //   );
  // }
//
// componentWillUpdate(nextProps) {
//   console.log(nextProps, 'com will update login');
//   this.props.riversFetch();
// }

componentWillReceiveProps(nextProps) {
  // console.log(nextProps, 'next props log in');
  //   if (nextProps.newUser) {
  //     this.context.router.push('/all');
  // } else if (nextProps.uid) {
  //     this.context.router.push('/selected');
  //   }
}

  render() {

    return (

      <div>
        <div className="jumbotron">
          <div className="jumbo-title">Paddle PDX</div>
        </div>
        <div className="login-box">
        <div className="header">Log In <br />With</div>
        <form className="login" onSubmit={this.signIn.bind(this)}>

        <div className="row">
          <button className="submit-button col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3" type="submit">Facebook</button>
         </div>
        </form>
        <div className="error">{this.props.error}</div>

        </div>
    </div>
    );
  }
}



const mapStateToProps = (state) => {
  const {  authenticated, error, email, password,loading, newUser, user, isUserSignedIn, isInProgress, hasError, errorMessage, uid } = state.auth;
  const selRivers = _.map(state.selectedRivers, (val, uid) => {
      debugger;
    return { ...val, uid}
  });
  return {  authenticated, error, loading, email, password, user, selRivers, newUser,isUserSignedIn, isInProgress, hasError, errorMessage, uid };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, riversFetch, signInSuccess, signInInProgress, signInError, signIn })(LoginForm);


// <div className="row">
//
//             <div className="col-xs-12 col-sm-8 col-sm-offset-2">
//             <input className="placeholder"
//             placeholder="test@test.com"
//             value={this.props.email}
//             onChange={this.onEmailChange.bind(this)}
//
//             />
//         </div>
//
//
//
// </div>
// <div className="row">
//
//     <div className="col-xs-12 col-sm-8 col-sm-offset-2">
//             <input className="placeholder"
//             secureTextEntry
//             placeholder="password"
//             value={this.props.password}
//             onChange={this.onPasswordChange.bind(this)}
//
//             />
//         </div>
//
// </div>
