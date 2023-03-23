import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      nomeUser: '',
      carregando: false,
    };
    this.loginFunction = this.loginFunction.bind(this);
    this.minimumToSubmit = this.minimumToSubmit.bind(this);
  }

  loginFunction() {
    this.setState({
      carregando: true,
    }, async () => {
      const { nomeUser } = this.state;
      await createUser({ name: nomeUser });
      const { history } = this.props;
      history.push('/search');
    });
  }

  minimumToSubmit({ target }) {
    const fantasyNumber = 3;
    const { value } = target;
    this.setState({
      disabled: value.length < fantasyNumber,
      nomeUser: value,
    });
  }

  render() {
    const { disabled, carregando } = this.state;
    return (
      <div data-testid="page-login" className="div-pai-login">
        <h2 className="login">Login</h2>
        {carregando ? <Carregando /> : (
          <form className="form-login">
            <label htmlFor="name-input">
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.minimumToSubmit }
                id="name-input"
                placeholder=" Digite seu login"
              />
            </label>
            <label>
              <input
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.loginFunction }
                disabled={ disabled }
                id="button-login"
              />
            </label>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
