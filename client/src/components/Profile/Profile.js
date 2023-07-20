import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import NavBar from '../NavBar/NavBar';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Profile.css';

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <div>
      <NavBar />
      <h1 className="profile-heading">User Profile</h1>
      <div className="user_details">
        <div className="icon">
          <BiSolidUserCircle />
        </div>
        <div className="info">
          <h2>
            Name: {user.firstName} {user.lastName}
            </h2>
          <h2>Email: {user.email}</h2>
        </div>
      </div>
    </div>
  );
}
