import React from 'react'

var ProfileRead = React.createClass({

  render: function() {
    return (
      <div>
        <h1>ProfileRead</h1>
        <div>{this.props.public.firstname}</div>
      </div>
    );
  }
})
export default ProfileRead;
