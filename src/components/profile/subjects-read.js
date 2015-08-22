import React from 'react';
import SubjectRead from './subject-read'


var SubjectsRead  = React.createClass({

  getDefaultProps: function() {
    return {
      values: {
        primaire: {},
        secondaire: {}
      }
    };
  },

  render: function() {
    var primaireList = [];
    if (this.props.values.primaire != undefined) {
      for (var name in this.props.values.primaire) {
        primaireList.push(<SubjectRead label={this.props.subjects.primaire[name]} />);
      }
    }
    var primaireUI = React.createElement('ul', {}, primaireList);

    var secondaireList = [];
    if (this.props.values.secondaire != undefined) {
      for (var name in this.props.values.secondaire) {
        secondaireList.push(<SubjectRead label={this.props.subjects.secondaire[name]} />);
      }
    }
    var secondaireUI = React.createElement('ul', {}, secondaireList);


    return (
      <ul>
        <li>
          <h1>Primaire</h1>
            { primaireUI }
        </li>
        <li>
          <h1>Secondaire</h1>
            {secondaireUI}
        </li>
      </ul>
    );
  }
});
export default SubjectsRead;
