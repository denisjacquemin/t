import React from 'react'
import Router from 'react-router'
var Link = Router.Link

class AuthenticatedLinks extends React.Component {
  render() {
    return (
      <ul>
        <li>Welcome {this.props.loggedUser.name}</li>
        <li><Link to="profile" params={{URLid: this.props.loggedUser.URLid}}>Mon profile</Link></li>
        <li onClick={this.props.loggoutHandler}>Logout</li>
      </ul>
    );
  }
}
export default AuthenticatedLinks;
