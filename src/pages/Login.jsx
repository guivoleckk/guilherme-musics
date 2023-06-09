import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../css/login.css';
import '../css/carregando.css';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      isLoading: false,
    };
    this.activeButton = this.activeButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isLoading: true,
    }, async () => {
      const { name } = this.state;
      await createUser({ name });
      const { history } = this.props;
      history.push('/search');
    });
  }

  activeButton({ target }) {
    const maxValue = 3;
    const { value } = target;
    if (value.length >= maxValue) {
      this.setState({
        disabled: false,
        name: value,
      });
    }
  }

  render() {
    const { disabled, isLoading } = this.state;
    return (
      <div className="login-container" data-testid="page-login">
        {isLoading ? <Carregando /> : (
          <div className="form-container">

            <form className="form1">
              <h1
                className="h1-login"
              >
                Guilherme Musics
              </h1>
              <label className="input-button" htmlFor="input-text">
                <input
                  type="text"
                  className="input-text"
                  data-testid="login-name-input"
                  onChange={ this.activeButton }
                  placeholder="Nome"
                  autoComplete="off"
                />
                <button
                  className="button-submit"
                  type="submit"
                  form="form1"
                  value="Submit"
                  data-testid="login-submit-button"
                  disabled={ disabled }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </label>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
