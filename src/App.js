import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Articles from './containers/Articles/Articles';
import SingleArticle from './containers/SingleArticle/SingleArticle';

import Page from './components/Page/Page';
import NotFound from './components/NotFound/NotFound';
import Homepage from './components/Homepage/Homepage';
import Loading from './components/Loading/Loading';



const App = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={routeProps =>  <Homepage {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/articles/" render={routeProps => <Articles {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/articles/:article" render={routeProps => <SingleArticle {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/loading" component={Loading} />
      <Route exact path="/:page" render={routeProps => <Page {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
