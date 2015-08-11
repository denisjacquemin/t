import React from 'react';
import WelcomeMessage from './welcome-message'
import AuthLinks from './auth-links'


class AuthBox extends React.Component {
  mixins: [ReactFireMixin]

  constructor() {
    super();
    this.handleTwitterAuth = this.handleTwitterAuth.bind(this)
    this.authDataCallback = this.authDataCallback.bind(this)
    this.handleLoggout = this.handleLoggout.bind(this)
    this.state = {fbref: null, username: null}
  }

  componentWillMount() {
    this.setState( {
      fbref:  new Firebase(this.props.fburi)
    })

  }

  authDataCallback(authData) {
    if (authData) {
      this.setState({username: authData.twitter.displayName})
      console.log("User " + authData.uid + " is logged in with " + authData.provider)
    } else {
      this.setState({username: null })
      console.log("User is logged out")
      //this.state.fbref.offAuth(authDataCallback)
    }
  }

  handleTwitterAuth(e) {
    this.state.fbref.onAuth(this.authDataCallback)
    this.state.fbref.authWithOAuthPopup("twitter", function(error, authData) {

      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully") // with payload:", authData)
      }
    })
  }

  handleLoggout(e) {
    this.state.fbref.unauth()
  }


  render() {
    return (
        <div>
          { this.state.username ? <WelcomeMessage username={this.state.username} loggoutHandler={this.handleLoggout} /> : <AuthLinks authHandler={this.handleTwitterAuth} />}
        </div>
    );
  }
}
export default AuthBox;
