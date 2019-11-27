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
  const [album, setAlbum] = useState([])
  const [albumCover, setAlbumCover] = useState([])

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    const fetchAlbumData = (token) => {
      const url = "https://api.spotify.com/v1/albums/1lZahjeu4AhPkg9JARZr5F"
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
          setAlbum(data)
          setAlbumCover(data.images[1].url)
        })
    }
    if(token){
      fetchAlbumData(token)
    }
  }, [token])

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
        <div>
          {album.name}
          {console.log(album)}
          {{albumCover} && (<img src={albumCover} alt={album.name} />)}
        </div>
      )}
    </div>
  );
}
  
export default App;

