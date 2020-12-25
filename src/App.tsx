import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { Movie, DetailsModal, NotFoundPage } from './Movie';

export function App() {
  const location = useLocation<{ background?: Location<typeof Location | null > }>();
  const background = location.state?.background;
  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={Movie} />
        <Route exact path="/film/:id" component={DetailsModal} />
        <Route component={NotFoundPage} />
      </Switch>
      {background && <Route path="/film/:id" component={DetailsModal} />}
    </>
  );
}
