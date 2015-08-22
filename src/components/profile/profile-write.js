import React from 'react'
import SubjectsWrite from './subjects-write'

var ProfileWrite = React.createClass({

  getDefaultProps: function() {
    return {
      data: {
        public: {
          firstname: '',
          lastname: '',
          subjects: {
            primaire: {},
            secondaire: {}
          }
        },
        private: {
          mobile: ''
        }
      }
    };
  },

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

  handleAddRemoveSubject: function(level, fieldname, value) {
    this.props.addRemoveSubject(level, fieldname, value)
  },

  render: function() {
    return (
      <div>
        <div>
          <h1>ProfileWrite</h1>
          <div>
            <form onSubmit={this.handleSubmit} >
              <input type="text" name="firstname" onChange={this.handleDataChange} value={this.props.data.public.firstname}  />
              <SubjectsWrite addRemoveSubject={this.handleAddRemoveSubject} values={this.props.data.subjects} />
              <input type="submit" value="Enregistrer" />
            </form>
          </div>

        </div>
      </div>
    );
  }
})
export default ProfileWrite;
