import React from 'react';

import './styles/AlbumTracks.scss';

const Track = (track) =>{
  return (
    <div className="track__container">
      <p className="track__title">{track.name}</p>
      <p className="track__artist">{track.artists[0].name}</p>
    </div>
  );
}

export default Track;