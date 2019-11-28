import React from 'react';

import { Link } from  'react-router-dom';

import './styles/Album.scss';

const Album = (album) =>{

  return (
    <div className="album__container">
      <Link to={`album/${album.id}`} className="album__listen">
        <img src={album.images[1].url} alt={album.name} />
      </Link>
      <div className="album__info">
        <h3 className="album__title">{album.name}</h3>
        <p className="album__artist">{album.artists[0].name}</p>
      </div>
    </div>
  );
}

export default Album;