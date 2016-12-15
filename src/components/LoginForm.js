import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';



class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonClick() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <div>
        <div>
          <Input
            label="Email"
            placeholder="test@test.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </div>

        <div>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </div>

        <div>
          {this.props.error}
        </div>

        <div>

          {this.renderButton()}
        </div>
      </div>
    );
  }
}



const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
