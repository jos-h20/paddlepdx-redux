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
    // this.props.riversFetch();
    this.context.router.push('/all');
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

  render() {

    return (
      <div>
        <form onSubmit={this.loginUser.bind(this)}>
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
          <button type="submit">Submit</button>
        </form>
        {this.props.error}
      <div className="text-xs-right">
        <Link to="/all" className="btn btn-primary">
          All
        </Link>
      </div>
      <div className="text-xs-right">
        <Link to="/selected" className="btn btn-primary">
          Selected
        </Link>
      </div>
    </div>
    );
  }
}



const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, riversFetch })(LoginForm);