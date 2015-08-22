import React from 'react';
import SubjectWrite from './subject-write'


var SubjectsWrite  = React.createClass({

  getDefaultProps: function() {
    return {
      values: {
        primaire: {},
        secondaire: {}
      }
    };
  },

  getInitialState: function() {

    return {
      values: {
        primaire: {},
        secondaire: {}
      }
    };
  },

  componentWillMount: function() {
    this.fbref = new Firebase('https://tutobel.firebaseio.com/subjects');
    var primaire = {}
    this.fbref.child('primaire').on("value", (s) => {
      s.forEach((subject) => {
        primaire[subject.key()] = subject.val();
      });
      this.setState({primaire: primaire});
    })
    var secondaire = {};
    this.fbref.child('secondaire').on("value", (s) => {
      s.forEach((subject) => {
        secondaire[subject.key()] = subject.val();
      });
      this.setState({secondaire: secondaire});
    })
  },

  handleUID: function(uid, name, URLid) {
    this.props.uidHandler(uid, name, URLid);
  },

  handleChange: function(level, fieldname, value) {
    this.props.addRemoveSubject(level, fieldname, value);
  },

  isSubjectChecked: function (obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return false;
      }
      obj = obj[args[i]];
    }
    return true;
  },

  render: function() {
    var primaireList = [];
    for (var name in this.state.primaire) {
      var checked = this.isSubjectChecked(this.props.values, 'primaire', name);
      primaireList.push(<SubjectWrite name={name} label={this.state.primaire[name]} checked={checked} addRemoveSubject={this.handleChange} level='primaire'/>);
    }
    var primaireUI = React.createElement('ul', {}, primaireList);

    var secondaireList = [];
    for (var name in this.state.secondaire) {
      var checked = this.isSubjectChecked(this.props.values, 'secondaire', name);
      secondaireList.push(<SubjectWrite name={name} label={this.state.secondaire[name]} checked={checked} addRemoveSubject={this.handleChange} level='secondaire' />);
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
        <li>
          <h1>Superieur/Universitaire</h1>
          <ul>
            <li><input type="checkbox" value="primaire" onChange={this.handleChange} /><label>Primaire</label></li>
            <li><input type="checkbox" value="secondaire" onChange={this.handleChange} /><label>Secondaire</label></li>
            <li><input type="checkbox" value="sup" onChange={this.handleChange}  /><label>Superieur/Universitaire</label></li>
            <li><input type="checkbox" value="adulte" onChange={this.handleChange} /><label>Adulte</label></li>
          </ul>
        </li>
        <li>
          <h1>Adulte</h1>
          <ul>
            <li><input type="checkbox" value="primaire" onChange={this.handleChange} /><label>Primaire</label></li>
            <li><input type="checkbox" value="secondaire" onChange={this.handleChange} /><label>Secondaire</label></li>
            <li><input type="checkbox" value="sup" onChange={this.handleChange}  /><label>Superieur/Universitaire</label></li>
            <li><input type="checkbox" value="adulte" onChange={this.handleChange} /><label>Adulte</label></li>
          </ul>
        </li>
      </ul>
    );
  }
});
export default SubjectsWrite;
