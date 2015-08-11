import React from 'react'

class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <form>
        <label for="subject">Matière</label>
        <input type="text" name="subject"/>
        <label for="level">Niveau</label>
        <input type="text" name="level"/>
        <label for="area">Code Postal</label>
        <input type="text" name="area"/>
        <input type="button" value="Chercher" />
        </form>
      </div>
    );
  }
}
export default SearchBox;
