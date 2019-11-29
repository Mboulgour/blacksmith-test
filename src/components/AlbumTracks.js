import React, { useState, useEffect } from 'react';
import hash from "../hash";
import fetchConfig from "../fetchConfig";
import axios from 'axios';

import Album from './Album';
import Track from './Track';
import './styles/AlbumTracks.scss';
// import './styles/AlbumTracks.scss';

const AlbumTracks = (props) =>{
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [albumTracks, setAlbumTracks] = useState([])
  const [album, setAlbum] = useState([])
  const { match } = props;
  let albumId = match.params.id;

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, [token]);

  useEffect( () => {
    const fetchAlbumData = async (token) => {
      const url = `https://api.spotify.com/v1/albums/${albumId}`;
      const result = await axios(url, fetchConfig);
      setAlbum(result.data);
      setLoading(false);
    };
    fetchAlbumData(token);
  }, [token, albumId]);


  useEffect( () => {
    const fetchAlbumTracksData = async (token) => {
      const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
      const result = await axios(url, fetchConfig);
      setAlbumTracks(result.data);
      setLoading(false);
    };
    fetchAlbumTracksData(token);
  }, [token, albumId]);


  return (
    <>
      {!loading && (
        <div className="tracks__wrapper">
          <Album {...album} />
          <div class="tracks__list">
          {albumTracks.items && albumTracks.items.map(track => 
            <Track {...track} />
          )}
          </div>
        </div>
      )}
    </>
  )
}

export default AlbumTracks;