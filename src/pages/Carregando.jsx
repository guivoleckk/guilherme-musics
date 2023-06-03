import React from 'react';
import '../css/carregando.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className="container-loading">
        <h1 className="loading">Carregando...</h1>
      </div>
    );
  }
}

export default Carregando;
