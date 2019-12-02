import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler'
import hash from "../hash";
import fetchConfig from "../fetchConfig";
import axios from 'axios';

import Album from './Album';
import Menu from './Menu';
import Track from './Track';
import './styles/AlbumTracks.scss';
// import './styles/AlbumTracks.scss';

const AlbumTracks = (props) =>{
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [albumTracks, setAlbumTracks] = useState([])
  const [album, setAlbum] = useState([])
  const [trackPreview, setTrackPreview] = useState(null)
  const [playing, setPlaying] = useState(false)
  const { match } = props;
  let albumId = match.params.id;

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, [token]);

  useEffect( () => {
    const fetchAlbumData = async () => {
      const url = `https://api.spotify.com/v1/albums/${albumId}`;
      const result = await axios(url, fetchConfig);
      setAlbum(result.data);
      setLoading(false);
    };
    fetchAlbumData(token);
  }, [token, albumId]);


  useEffect( () => {
    const fetchAlbumTracksData = async () => {
      const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
      const result = await axios(url, fetchConfig);
      setAlbumTracks(result.data);
      setLoading(false);
    };
    fetchAlbumTracksData(token);
  }, [token, albumId]);

  return (
    <>
      <div className="home__top_container">
      <Menu />
      {!loading && (
        <div className="tracks__wrapper">
          <Album {...album} />
          <div className="tracks__list">
            {albumTracks.items && albumTracks.items.map((track, index) => 
              <div className={track.preview_url === trackPreview && playing ? "track__container active" : "track__container"} onClick={() => {
                  setTrackPreview(track.preview_url); 
                  setPlaying(trackPreview === track.preview_url ? false : true)
                }
              }>
                <Track {...track} key={index} index={index + 1} />
              </div>
            )}
          </div>
        </div>
      )}
      {trackPreview && (
        <ReactHowler
          src={trackPreview}
          format={['mp3']}
          playing={playing ? true : false}
        />
      )}
        <div className="player__wrapper">
          <div className="player__now_playing">
            <div className="player__title">Now playing:</div> 
            {trackPreview && albumTracks.items.filter(track => track.preview_url === trackPreview).map(currentTrack =>
              <p className="player__current_track">{currentTrack.name}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumTracks;