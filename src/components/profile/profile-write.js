import React from 'react'

var ProfileWrite = React.createClass({

  getInitialState: function() {
      return {data: this.props.data };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.submitHandler();
  },

  handleDataChange: function(e) {
    this.props.profileHandler(e.target.name, e.target.value);
  },

  render: function() {
    var data = this.props.data;
    return (
      <div>
        <div>
          <h1>ProfileWrite</h1>
          <div>
            <form onSubmit={this.handleSubmit} >
              <input type="text" name="firstname" onChange={this.handleDataChange} value={data.public.firstname}  />
              <input type="submit" value="Enregistrer" />
            </form>
          </div>

        </div>
      </div>
    );
  }
})
export default ProfileWrite;
