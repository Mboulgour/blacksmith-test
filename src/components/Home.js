import React, { useState, useEffect } from "react";
import hash from "../hash";

import Album from './Album'

import './styles/Home.scss';

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "08656aa303ef4b38a636260bf65b3be7";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
  
const Home = () =>{

  // State
  const [token, setToken] = useState(null)
  const [artist, setArtist] = useState([])
  const [artistImg, setArtistImg] = useState([])
  const [artistAlbums, setArtistAlbums] = useState([])

  // URL variables
  const artistId = '36QJpDe2go2KgaRleHCDTp'

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    // Fetching artist
    const fetchArtistData = (token) => {
      const url = `https://api.spotify.com/v1/artists/${artistId}`
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };
      // Make a call using the token
      fetch(url, config)
        .then(res => res.json())
        .then(data => {
          setArtist(data)
          setArtistImg(data.images[1].url)
        })
    }
    if(token){
      fetchArtistData(token)
    }
  }, [token]);

  useEffect(() => {
    // Fetching albums from artist
    const fetchArtistAlbumsData = (token) => {
      const url = `https://api.spotify.com/v1/artists/${artistId}/albums`
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };
      // Make a call using the token
      fetch(url, config)
        .then(res => res.json())
        .then(data => {
          setArtistAlbums(data)
        })
    }
    
    fetchArtistAlbumsData(token)

  }, [token]);

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
      {token && (
        <div className="artist__wrapper">
          <div className="artist__header">
            <h1 className="artist__title">
              {artist.name}
            </h1>
            {{artistImg} && (<img  className="artist__img" src={artistImg} alt={artist.name} />)}
          </div>
          <div className="album__list">
            {artistAlbums.items && artistAlbums.items.map(album => 
              <Album {...album} {...token} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
  
export default Home;

