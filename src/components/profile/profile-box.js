import React from 'react'
import ProfileRead from './profile-read'
import ProfileWrite from './profile-write'
var Navigation = require('react-router').Navigation


var Profile = React.createClass({
  mixins: [Navigation],

  // getInitialState: function() {
  //
  //     return { profile: {
  //         URLid: '',
  //         data: {
  //           public: {
  //             firstname:'',
  //             lastname:'',
  //           },
  //           private: {
  //             mobile:''
  //           }
  //         }
  //       }
  //     }
  // },

  componentWillMount: function() {
    this.setState({profile: {
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
    });


    this.fbref = new Firebase('https://tutobel.firebaseio.com');

    // get and set the profile based on the URLid
    this.fbref.child('users').orderByChild('URLid').equalTo(this.props.params.URLid).on('value', (s) => {
      if (s.exists()) {
        var uid = ''; s.forEach(function(childSnapshot) { uid = childSnapshot.key(); }); // get the uid
        if (s.child(uid + '/profile').exists()) { this.setState({profile: s.child(uid + '/profile').val()}); } // set the profile state found
        // else { // if no profile yet for this user, create an empty profile
        //   // do nothing the state is already initialize with empty data
        //
        // }
      } else {
        this.transitionTo('/pagenotfound'); // no profile found! redirect to page-not-found
      }
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
    var uiWrite;
    if (this.props.loggedUser.uid ) {
      uiWrite =  <ProfileWrite data={this.state.profile.data} profileHandler={this.handleProfileChange} submitHandler={this.saveProfile} />
    }
    return (
      <div>
        { uiWrite }
        <ProfileRead public={this.state.profile.data.public}  />
      </div>
    );
  }
});
export default Profile;
