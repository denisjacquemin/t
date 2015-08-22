import React from 'react'
var Navigation = require('react-router').Navigation


var Search = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
      return {levels: null, subjects: null };
  },

  handleSearch: function() {
    console.log('Searching')
    this.transitionTo('results')
  },

  componentWillMount: function() {
    this.fbref = new Firebase('https://tutobel.firebaseio.com');
    this.fbref.child('levels').on('value', (s) => {
      this.setState({levels: s.val()});
    });
  },

  handleLevelChange: function(e) {
    console.log('handleLevelChange: ' + e.target.value);
    this.fbref.child('subjects').child(e.target.value).on('value', (s) => {
      this.setState({subjects: s.val()});
    });
  },

  render: function() {
    var levelOptions = [];
    if (this.state.levels) {
      for (var name in this.state.levels) {
        levelOptions.push(<option value={name}>{this.state.levels[name]}</option>)
      }
    }
    var levelOptionsUI = React.createElement('select', {onChange: this.handleLevelChange}, levelOptions);

    var subjectOptions = [];
    if (this.state.subjects) {
      for (var name in this.state.subjects) {
        subjectOptions.push(<option>{this.state.subjects[name]}</option>)
      }
    }
    var subjectOptionsUI = React.createElement('select',{} , subjectOptions);

    return (
      <div>
        <h1>SearchBox</h1>
        <form>
        <label for="level">Niveau</label>
        {levelOptionsUI}
        <label for="subject">Matière</label>
        {subjectOptionsUI}
        <label for="area">Code Postal</label>
        <input type="text" name="area"/>
        <input type="button" value="Chercher" onClick={this.handleSearch} />
        </form>
      </div>
    );
  }
})
export default Search;
