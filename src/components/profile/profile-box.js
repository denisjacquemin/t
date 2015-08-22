import React from 'react'
import ProfileRead from './profile-read'
import ProfileWrite from './profile-write'
var Navigation = require('react-router').Navigation


var Profile = React.createClass({
  mixins: [Navigation],

  componentWillMount: function() {
    this.setState({ profile: {} });

    this.fbref = new Firebase('https://tutobel.firebaseio.com');

    // get and set the profile based on the URLid
    this.fbref.child('users').orderByChild('URLid').equalTo(this.props.params.URLid).on('value', (s) => {
      if (s.exists()) {
        var uid = ''; s.forEach(function(childSnapshot) { uid = childSnapshot.key(); }); // get the uid
        if (s.child(uid + '/profile').exists()) {
          this.setState({profile: s.child(uid + '/profile').val() }); // set the profile state found
        }
      } else {
        this.transitionTo('/pagenotfound'); // no profile found! redirect to page-not-found
      }
    });

    this.fbref.child('subjects').on('value', (s) => {
      this.setState({subjects: s.val()});
    });
  },

  handleProfileChange: function(fieldname, value) {
    var profile = this.state.profile;
    this.addNode(profile, value, 'data.public.' + fieldname );
    this.setState({profile: profile });
    this.saveProfile();
    console.log('Profile State updated: ' + JSON.stringify(profile));
  },

  handleAddRemoveSubject: function(level, fieldname, value) {
    var profile = this.state.profile;

    if (value) { // value == true => add
      this.addNode(profile, true, 'data.subjects.' + level + '.' + fieldname);
    } else { // value == false => remove
      delete profile.data.subjects[level][fieldname];
    }

    this.setState({profile: profile});
    this.saveProfile();
  },

  addNode: function (obj, value, path) {
    if (typeof path === "string") {
        var path = path.split('.');
    }

    if(path.length > 1){
        var p=path.shift();
        if(obj[p]==null || typeof obj[p]!== 'object'){
             obj[p] = {};
        }
        this.addNode(obj[p], value, path);
    }else{
        obj[path[0]] = value;
    }
  },

  saveProfile: function() {
    console.log('this.state.profile: ' + JSON.stringify(this.state.profile));
    this.fbref.child(this.props.loggedUser.uid).child('profile').update(this.state.profile);
    console.log('profile saved to fb');
  },




  render: function() {
    var uiWrite;
    if (this.props.loggedUser.uid ) {
      uiWrite =  <ProfileWrite data={this.state.profile.data}
                               profileHandler={this.handleProfileChange}
                               addRemoveSubject={this.handleAddRemoveSubject}
                               submitHandler={this.saveProfile} />
    }
    return (
      <div>
        { uiWrite }
        <ProfileRead data={this.state.profile.data} subjects={this.state.subjects} />
      </div>
    );
  }
});
export default Profile;
