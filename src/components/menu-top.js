import React from 'react';
import AuthBox from './auth-box';

class MenuTop extends React.Component {
  render() {
    return (
      <ul>
        <li><a href="#" class="link">Inscription</a></li>
        <li><AuthBox fburi="https://tutobel.firebaseio.com/" /></li>
        <li><a href="#" class="button">Publiez votre annonce</a></li>
      </ul>
    );
  }
}
export default MenuTop;
