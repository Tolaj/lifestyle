import React from 'react';
import ProfileDetailsModal from './profileDetailsModal';
import FriendsListModal from './friendsListModal';
import GroupsListModal from './groupsListModal';

function ProfileModal(props) {
  return (<>
      {props._as.profileTab == 0 ? <ProfileDetailsModal  _as = {props._as} /> : <></>}
      {props._as.profileTab == 1 ? <FriendsListModal  _as = {props._as} /> : <></>}
      {props._as.profileTab == 2 ? <GroupsListModal  _as = {props._as} /> : <></>}

  </>);
}

export default ProfileModal;