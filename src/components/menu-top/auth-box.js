import React from 'react';
import NotAuthenticatedLinks from './not-authenticated-links'
import AuthenticatedLinks from './authenticated-links'
import Router from 'react-router'
var Navigation = Router.Navigation

var AuthBox = React.createClass({
  mixins: [Navigation],

  componentWillMount: function() {
    this.fbref = new Firebase('https://tutobel.firebaseio.com/');
  },

  authDataCallback: function(authData) {

    if (authData) { // if user authenticated we have a authData object

       this.fbref.child("users").child(authData.uid).once('value', (s) => {
         if(s.exists()) {
           console.log('Welcome back ' + s.val().name);
           this.props.uidHandler(s.val().uid, s.val().name, s.val().URLid);
         } else {
           console.log('First time here for ' + authData.twitter.displayName);
           var uid = authData.uid;
           var name = authData.twitter.displayName;
           var URLid = Math.random().toString(36).substring(7);
           this.fbref.child("users").child(uid).set({
             provider: authData.provider,
             uid: uid,
             name: name,
             userImageURL: authData.twitter.profileImageURL,
             URLid: URLid
           }, (error) => {
             console.log('failureMessage: ' + error);
           })
           this.props.uidHandler(uid, name, URLid);
         }
       })
    } else {
      console.log('rese† state');
      this.props.uidHandler(null, null, null);
      // logout redirect to search page
      this.transitionTo('search')
    }
  },


  handleTwitterAuth: function(e) {
    this.fbref.onAuth(this.authDataCallback)
    this.fbref.authWithOAuthPopup("twitter", (error, authData) => {

      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully") // with payload:", authData)
      }
    })
  },

  handleLoggout: function(e) {
    this.fbref.unauth()
  },


  render: function() {
    return (
        <div>
          { this.props.loggedUser.uid ? <AuthenticatedLinks loggedUser={this.props.loggedUser} loggoutHandler={this.handleLoggout} /> : <NotAuthenticatedLinks authHandler={this.handleTwitterAuth} />}
        </div>
    );
  }
})
export default AuthBox;
