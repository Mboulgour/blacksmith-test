import React, { useState, useEffect} from 'react';

import hash from "../hash";
import fetchConfig from "../fetchConfig";
import axios from 'axios';

import Album from './Album';
import Menu from './Menu';

import './styles/Home.scss';

// https://api.spotify.com/v1/me/albums/contains

export const UserAlbums = () => {

  const [token, setToken] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect( () => {
    const fetchUserAlbumsData = async () => {
      const url = `https://api.spotify.com/v1/me/albums`;
      const result = await axios(url, fetchConfig);
      setUserAlbums(result.data);
      setLoading(false);
    };
    fetchUserAlbumsData(token);
  }, []);

  return (
    <>
      <div className="home__top_container">
      <Menu />
      {loading === false && (
        <div className="artist__wrapper">
          <div className="album__list">
            {userAlbums.items.map(album => 
              <Album {...album.album} />
            )}
          </div>
          {console.log(userAlbums)}
        </div>
      )} 
      </div>  
    </>
  )
}

export default UserAlbums;
