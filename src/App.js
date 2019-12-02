import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home'
import AlbumTracks from './components/AlbumTracks'
import UserAlbums from './components/UserAlbums';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path="/album/:id" component={AlbumTracks} />
      <Route path="/me/albums" component={UserAlbums} />
    </Switch>
  );
}

export default App;
