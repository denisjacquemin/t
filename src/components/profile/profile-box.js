import React from 'react'
import ProfileRead from './profile-read'
import ProfileWrite from './profile-write'

var Profile = React.createClass({

  getInitialState: function() {

      return { profile: {
          URLid: '',
          data: {
            public: {
              firstname:'',
              lastname:'',
            },
            private: {
              mobile:''
            }
          }
        }
      }
  },

  componentWillMount: function() {
    this.fbref = new Firebase('https://tutobel.firebaseio.com');

    this.fbref.child('users').orderByChild('URLid').equalTo(this.props.params.URLid).on('value', (s) => {
      if (s.exists()) {
        this.setState({user: s.val()});
      } else {
        console.log('hello');
        //this.fbref.set(this.state.profile);
      }
      console.log('profile found ' + s.val());
    });
  },

  handleProfileChange: function(fieldname, value) {
    var profile = this.state.profile;

    switch(fieldname) {
      case 'firstname': profile.data.public.firstname = value; break;
    }
    this.setState({profile: profile });
    console.log('Profile State updated: ' + JSON.stringify(profile));
  },

  saveProfile: function() {
    this.fbref.child('users').child(this.props.loggedUser.uid).child('profile').update(this.state.profile);
    console.log('profile saved to fb');
  },




  render: function() {
    return (
      <div>
        <ProfileWrite data={this.state.profile.data} profileHandler={this.handleProfileChange} submitHandler={this.saveProfile} />
        <ProfileRead public={this.state.profile.data.public}  />
      </div>
    );
  }
});
export default Profile;
