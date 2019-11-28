import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home'
import AlbumTracks from './components/AlbumTracks'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path="/album/:id" component={AlbumTracks} />
    </Switch>
  );
}

export default App;
