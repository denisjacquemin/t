import React from 'react'
var Navigation = require('react-router').Navigation


var Results = React.createClass({
  mixins: [Navigation],

  handleSearch: function() {
    console.log('Searching')
    this.transitionTo('profile')
  },

  render: function() {
    return (
      <div>
        <h1>Results</h1>
      </div>
    );
  }
})
export default Results;
