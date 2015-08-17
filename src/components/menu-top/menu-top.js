import React from 'react';
import AuthBox from './auth-box';

var MenuTop  = React.createClass({

  handleUID: function(uid, name, URLid) {
    this.props.uidHandler(uid, name, URLid);
  },

  render: function() {
    return (
      <ul>
        <li class="link">À propos</li>
        <li><AuthBox fburi="https://tutobel.firebaseio.com/" uidHandler={this.handleUID} loggedUser={this.props.loggedUser} /></li>
        <li class="button">Publiez votre annonce</li>
      </ul>
    );
  }
});
export default MenuTop;
