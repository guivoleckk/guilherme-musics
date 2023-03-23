import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: false,
      favoriteMusicCheckbox: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const favoriteMusicCheckbox = await this.favoriteCheckBox();
    this.setState({ favoriteMusicCheckbox });
  }

  async handleChange(event) {
    const { music } = this.props;
    const { checked } = event.target;
    this.setState({ carregando: true, favoriteMusicCheckbox: checked });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ carregando: false });
  }

  favoriteCheckBox = async () => {
    const { music } = this.props;
    // console.log(music);
    const { trackId } = music;
    const recoveryFavorites = await getFavoriteSongs();
    return recoveryFavorites.map((item) => item.trackId).includes(trackId);
  };

  render() {
    const { carregando, favoriteMusicCheckbox } = this.state;
    const { music } = this.props;
    const { previewUrl, trackName, trackId } = music;
    return (
      <div>
        {carregando ? <Carregando /> : (
          <div>
            <div className="track-name">{trackName}</div>
            <div className="father-audio">
              <audio
                className="tag-audio"
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                Seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>
          </div>
        )}
        <div className="father-favorite">
          <label htmlFor="checkboxzin" className="label-favorita">
            Favorita
            <input
              id="checkboxzin"
              className="favorite-input"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onChange={ this.handleChange }
              checked={ favoriteMusicCheckbox }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
  }),
}.isRequired;

export default MusicCard;
