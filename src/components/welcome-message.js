import React from 'react'

class WelcomeMessage extends React.Component {
  render() {
    return (
      <div>Welcome {this.props.username} <span onClick={this.props.loggoutHandler}>Logout</span></div>
    );
  }
}
export default WelcomeMessage;
