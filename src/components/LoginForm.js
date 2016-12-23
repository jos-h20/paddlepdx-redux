import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { emailChanged, passwordChanged, loginUser, riversFetch } from '../actions';



class LoginForm extends Component {
  constructor(props) {
    super(props);
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

componentWillUpdate(nextProps) {
  console.log(nextProps, 'com will update login')
}

componentWillReceiveProps(nextProps) {
  console.log(nextProps, 'next props log in');
    // if (nextProps.user && nextProps.selRivers) {
    //   this.context.router.push('/selected');
    // } else if (nextProps.newUser || nextProps.user) {
    //   this.context.router.push('/all');
    // }
}

  render() {

    return (

      <div>
        <div className="jumbotron">
          <h1>Paddle PDX</h1>
        </div>
        <div>
          <Link className="links" to="/all">
            All
          </Link>
          <Link className="links" to="/selected">
            Selected
          </Link>
        </div>
        <form className="login" onSubmit={this.loginUser.bind(this)}>
            <input
            placeholder="test@test.com"
            value={this.props.email}
            onChange={this.onEmailChange.bind(this)}

            />
            <input
            placeholder="password"
            value={this.props.password}
            onChange={this.onPasswordChange.bind(this)}

            />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="error">{this.props.error}</div>

    </div>
    );
  }
}



const mapStateToProps = (state) => {
  const { email, password, error, loading, newUser, user } = state.auth;
  const { selRivers } = state.selectedRivers;
  return { email, password, error, loading, user, selRivers, newUser };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, riversFetch })(LoginForm);

// <Link className="links" to="/all">
//   All
// </Link>
// <Link className="links" to="/selected">
//   Selected
// </Link>
