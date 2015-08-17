import React from 'react'
var Navigation = require('react-router').Navigation


var Search = React.createClass({
  mixins: [Navigation],

  handleSearch: function() {
    console.log('Searching')
    this.transitionTo('results')
  },
  
  render: function() {
    return (
      <div>
        <h1>SearchBox</h1>
        <form>
        <label for="subject">Matière</label>
        <input type="text" name="subject"/>
        <label for="level">Niveau</label>
        <input type="text" name="level"/>
        <label for="area">Code Postal</label>
        <input type="text" name="area"/>
        <input type="button" value="Chercher" onClick={this.handleSearch} />
        </form>
      </div>
    );
  }
})
export default Search;
