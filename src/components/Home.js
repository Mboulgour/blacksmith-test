import React, { useState, useEffect } from "react";
import hash from "../hash";
import fetchConfig from "../fetchConfig";
import axios from 'axios';

import Album from './Album'
import Menu from './Menu'

import './styles/Home.scss';

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "08656aa303ef4b38a636260bf65b3be7";
const redirectUri = "https://mini-spotify.netlify.com/";
const scopes = [
  "user-library-read",
];
  
const Home = () =>{
  // State
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [artist, setArtist] = useState([])
  const [artistAlbums, setArtistAlbums] = useState([])

  // URL variables
  const artistArray = ['22WZ7M8sxp5THdruNY3gXt', '36QJpDe2go2KgaRleHCDTp', '47yvARr7dCOKqvjDVwfbf3', '2EaeVm1MjlVtsUV0ebT0vB'];
  const artistId = artistArray[Math.floor(Math.random()*artistArray.length)]

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect( () => {
    const fetchArtistData = async () => {
      const url = `https://api.spotify.com/v1/artists/${artistId}`;
      const result = await axios(url, fetchConfig);
      setArtist(result.data);
      setLoading(false);
    };
    fetchArtistData(token);
  }, []);


  useEffect( () => {
    const fetchArtistAlbumsData = async () => {
      const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
      const result = await axios(url, fetchConfig);
      setArtistAlbums(result.data);
      setLoading(false);
    };
    fetchArtistAlbumsData(token);
  }, []);

  return (
    <>
      {/* Unconnected content */}
      {!token && (
        <div className="home__wrapper">
          <h1>To continue, please :</h1>
          <a className="connect__btn"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Log in to Spotify
          </a>
          <a className="connect__info" href="/">Pourquoi dois-je me connecter ?</a>
        </div>
      )}
      
      {/* Connected content */}
      {token && !loading && (
        <div className="home__top_container">
          <Menu />
          <div className="artist__wrapper">
            <div className="artist__container">
              <div className="artist__header">
                <h1 className="artist__title">
                  {artist.name}
                </h1>
                <div className="artist__img"><img src={artist.images[1].url} alt={artist.name} /></div>
              </div>
              <div className="album__list">
                {artistAlbums.items && artistAlbums.items.map(album => 
                  <Album {...album} key={album.id}/>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  
export default Home;

