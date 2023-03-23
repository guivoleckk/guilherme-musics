import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    nameTaked: '',
    carregando: true,
  };

  async componentDidMount() {
    const nameUser = await getUser();
    this.setState({
      nameTaked: nameUser.name,
      carregando: false,
    });
  }

  render() {
    const { nameTaked, carregando } = this.state;
    return (
      <header data-testid="header-component" className="header-text">
        {carregando ? (
          <Carregando />
        ) : (
          <>
            <p data-testid="header-user-name" className="header-name">
              {`Seja bem vindo: ${nameTaked}!`}
            </p>
            <div className="link-bar">
              <Link
                data-testid="link-to-search"
                to="/search"
                className="link-search"
              >
                Pesquisar
              </Link>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className="link-favorite"
              >
                Favorites
              </Link>
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className="link-profile"
              >
                Profile
              </Link>
            </div>
          </>
        )}
      </header>
    );
  }
}
export default Header;
