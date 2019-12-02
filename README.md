# Mini-Spotify


## Main features

- Mini-spotify is an app using the **Spotify developers Web-API** : https://developer.spotify.com/documentation/web-api/
- It demands the authorization to access data from the user's Spotify Account (saved albums)
- Returns a random artist and his albums from an array of **my** favorite artists
- Can access user's saved albums and display a list of it

## Player

- The web player is made with react-howler (https://github.com/thangngoc89/react-howler)
- It displays the name of the song and a 30seconds mp3 preview of the track.

## Ameliorations

- A clear need to refactor the code (a lot of repetition, a lot of unecessary CSS)
- Refactor components
- Implement _styled-components_
- Use _Redux_ to pass global states and avoid repetition
- Improve the player design
- Improve device compatibility (only desktop and mobile styles are set, no in-between)