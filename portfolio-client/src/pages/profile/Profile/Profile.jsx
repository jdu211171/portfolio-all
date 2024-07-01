import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="top">Top</Link>
          </li>
          <li>
            <Link to="qa">QA</Link>
          </li>
          <li>
            <Link to="stats">Stats</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Profile;
