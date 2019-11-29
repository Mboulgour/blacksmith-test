import React from 'react';

import './styles/AlbumTracks.scss';

const Track = (track) =>{
  return (
    <>
      <div className="track__header">
        <p>{track.index} - </p>
        <p className="track__title">{track.name}</p>
      </div>
      <p className="track__artist">{track.artists[0].name}</p>
    </>
  );
}

export default Track;