import React, { useState, useEffect } from "react";
import hash from "./hash";

import './App.scss';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "08656aa303ef4b38a636260bf65b3be7";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
  
const App = () =>{
  const [token, setToken] = useState(null)
  const [artist, setArtist] = useState([])
  const [artistImg, setArtistImg] = useState([])
  const [artistAlbums, setArtistAlbums] = useState([])

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    // Fetching artist
    const fetchArtistData = (token) => {
      const url = "https://api.spotify.com/v1/artists/36QJpDe2go2KgaRleHCDTp"
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
      const url = "https://api.spotify.com/v1/artists/36QJpDe2go2KgaRleHCDTp/albums"
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
    <div className="App">
      {!token && (
        <>
          <h1>To continue, please :</h1>
          <a className="connect__btn"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Log in to Spotify
          </a>
          <a className="connect__info" href="#">Pourquoi dois-je me connecter ?</a>
        </>
      )}
      {token && (
        <>
        <div>
          {artist.name}
        </div>
        <div>
          {{artistImg} && (<img src={artistImg} alt={artist.name} />)}
        </div>
        <div>
          {artistAlbums.items && artistAlbums.items.map(album => 
            <ul>
              <li>{album.name}</li>
              <li><img src={album.images[1].url} alt={album.name}/></li>
            </ul>
          )}
        </div>
        </>
      )}
    </div>
  );
}
  
export default App;

