import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">Profile Edit</div>
      </>
    );
  }
}

export default ProfileEdit;
