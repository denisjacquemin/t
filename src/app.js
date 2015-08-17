import React from 'react'
import Router from 'react-router'

import MenuTop from './components/menu-top/menu-top'
import Search from './components/search'
import Profile from './components/profile/profile-box'
import Results from './components/results'
import PageNotFound from './components/page-not-found'

var Route = Router.Route
var Link = Router.Link
var RouteHandler = Router.RouteHandler
var DefaultRoute = Router.DefaultRoute
var NotFoundRoute = Router.NotFoundRoute

var App = React.createClass({
  getInitialState: function() {
    return {
      loggedUser: {
        uid: null,
        name: null,
        URLid: null
      }
    }
  },

  handleUID: function(uid, name, URLid) {
    this.setState({
      loggedUser: {
        uid: uid,
        name: name,
        URLid: URLid
      }
    });
  },

  render: function() {
    return (
      <div>
        <MenuTop uidHandler={this.handleUID} loggedUser={this.state.loggedUser}/>
        <RouteHandler loggedUser={this.state.loggedUser}/>
      </div>
    )
  }
});

var routes = (
    <Route path="/" handler={App}>
      <DefaultRoute handler={Search} />
			<Route path="search" name="search" handler={Search} />
      <Route path="results" name="results" handler={Results} />
      <Route path="profile/:URLid" name="profile" handler={Profile} />
      <NotFoundRoute handler={PageNotFound} />
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body)
});
