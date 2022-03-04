import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionNewUser } from '../actions';
import disabledButton from '../helpers/disabledButton';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  onClick = () => {
    const { email, password } = this.state;
    const { newUser, history } = this.props;
    this.setState({
      email,
      password,
    });
    newUser(email, password);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>login</h1>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="email"
            value={ email }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="senha">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.onClick }
          disabled={ disabledButton(email, password) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newUser: (email, password) => dispatch(actionNewUser(email, password)),
});

Login.propTypes = {
  newUser: propTypes.func.isRequired,
  history: propTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
