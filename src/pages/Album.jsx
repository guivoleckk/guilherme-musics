import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      nameOfArtist: '',
      nameOfAlbum: '',
      albumArray: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const fetchAlbum = await getMusics(id);
    const { artistName, collectionName } = fetchAlbum[0];
    this.setState({
      nameOfArtist: artistName,
      nameOfAlbum: collectionName,
      albumArray: fetchAlbum,
    });
  }

  render() {
    const { nameOfArtist, nameOfAlbum, albumArray } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p className="banda" data-testid="artist-name">{nameOfArtist}</p>
          <p className="title-album" data-testid="album-name">{nameOfAlbum}</p>
          <ul>
            {albumArray.map((item) => item.kind && (
              <MusicCard
                key={ item.trackId }
                music={ item }
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
