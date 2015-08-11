import React from 'react';

class AuthLinks extends React.Component {
  render() {
    return (
      <div>
        <h1>Connexion</h1>
        <ul>
          <li><span onClick={this.props.authHandler}>twitter</span></li>
          <li><span onClick={this.props.authHandler}>google</span></li>
        </ul>
      </div>
    );
  }
}
export default AuthLinks;
