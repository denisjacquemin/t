import React from 'react';

var SubjectWrite  = React.createClass({

  handleChange: function(level, e) {
    console.log('level changed: ' + level + ' ' + e.target.name + ' ' + e.target.checked);
    this.props.addRemoveSubject(level, e.target.name, e.target.checked)
  },

  render: function() {
    return (
      <li>
        <input  type="checkbox"
                name={this.props.name}
                onChange={this.handleChange.bind(this, this.props.level)}
                checked={this.props.checked} />
        <label>{this.props.label}</label>
      </li>
    );
  }
});
export default SubjectWrite;
