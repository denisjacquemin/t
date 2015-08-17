import React from 'react';

class NotAuthenticatedLinks extends React.Component {
  render() {
    return (
      <ul>
        <h1>Connexion</h1>
        <ul>
          <li><span onClick={this.props.authHandler}>twitter</span></li>
          <li><span onClick={this.props.authHandler}>google</span></li>
        </ul>
      </ul>
    );
  }
}
export default NotAuthenticatedLinks;
