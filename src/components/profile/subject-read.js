import React from 'react';

var SubjectRead  = React.createClass({

  render: function() {
    return (
      <li>
        <span>{this.props.label}</span>
      </li>
    );
  }
});
export default SubjectRead;
