import React from 'react'
import SubjectsRead from './subjects-read'


var ProfileRead = React.createClass({

  getDefaultProps: function() {
    return {
      data: {
        public: {
          firstname: '',
          lastname: '',
        },
        subjects: {
          primaire: {},
          secondaire: {}
        }
      }
    };
  },

  render: function() {
    var firstname = this.props.data.public.firstname || '';
    return (
      <div>
        <h1>ProfileRead</h1>
        <div>{this.props.data.public.firstname}</div>
        <SubjectsRead values={this.props.data.subjects} subjects={this.props.subjects} />
      </div>
    );
  }
})
export default ProfileRead;
