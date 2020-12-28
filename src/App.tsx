import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Movie, DetailsModal, NotFoundPage } from './Movie';

export function App() {
  return (
    <>
      <Switch>
        <Route exact path={['/', '/film/:id']} component={Movie} />
        <Redirect to="/not-found" />
      </Switch>
      <Route exact path="/film/:id" component={DetailsModal} />
      <Route exact path="/not-found" component={NotFoundPage} />
    </>
  );
}
