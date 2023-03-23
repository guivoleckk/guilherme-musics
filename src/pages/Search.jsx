import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputControl: '',
      carregando: false,
      albumTaked: [],
      artistSearched: '',
    };
    this.controlInput = this.controlInput.bind(this);
    this.rescueAlbum = this.rescueAlbum.bind(this);
  }

  controlInput({ target }) {
    const { value } = target;
    this.setState({ inputControl: value });
  }

  async rescueAlbum(event) {
    event.preventDefault();
    const { inputControl } = this.state;
    this.setState({ carregando: true });
    const requestAPI = await searchAlbumsAPI(inputControl);
    this.setState({
      inputControl: '',
      carregando: false,
      albumTaked: requestAPI,
      artistSearched: inputControl,
    });
  }

  render() {
    const { inputControl, carregando, albumTaked, artistSearched } = this.state;
    console.log(albumTaked);
    const magicNumber = 2;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="page-search">
          {carregando ? <Carregando /> : <p className="search-render"> Search Music </p>}
        </div>
        <form onSubmit={ this.rescueAlbum } className="form-search">
          <div className="section-search">
            <label htmlFor="search-artist-input">
              Search Music:
              { ' ' }
              <input
                type="text"
                id="search-artist-input"
                data-testid="search-artist-input"
                onChange={ this.controlInput }
                value={ inputControl }
              />
            </label>
            <label htmlFor="buttonForm">
              <button
                id="buttonForm"
                type="submit"
                data-testid="search-artist-button"
                disabled={ inputControl.length < magicNumber }
              >
                Buscar
              </button>
            </label>
          </div>
        </form>
        <div className="result-text">
          {artistSearched && (
            <p>
              Resultado de álbuns de:
              { '            ' }
              { artistSearched }
            </p>
          )}
        </div>
        <div className="albuns-render">
          { albumTaked.length > 0 ? (
            <div className="album-list">
              {albumTaked.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    className="link-album"
                    to={ `/album/${album.collectionId}` }
                    key={ album.collectionId }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.collectionId } />
                    {album.collectionName}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="error-msg">Nenhum álbum foi encontrado</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Search;
