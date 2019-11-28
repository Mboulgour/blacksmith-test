import React, { useState, useEffect } from 'react';
import hash from "../hash";

const AlbumTracks = (props) =>{
  const [token, setToken] = useState(null)
  const [albumTracks, setAlbumTracks] = useState([])
  const { match } = props;
  let albumId = match.params.id;

  useEffect(() =>{  
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
    console.log(token)
  }, [token]);

  useEffect(() => {
    // Fetching AlbumTracks
    const fetchAlbumTracksData = (token) => {
      const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`
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
          setAlbumTracks(data)
        })
    }
    if(token){
      fetchAlbumTracksData(token)
    }
  }, [token, albumId]);


  return (
    <div>
      {albumId}
      {albumTracks.items && albumTracks.items.map(track => 
        <li>{track.name}</li>
      )}
    </div>
  );
}

export default AlbumTracks;