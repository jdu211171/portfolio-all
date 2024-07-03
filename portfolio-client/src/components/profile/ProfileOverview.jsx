import React from "react";
import PropTypes from "prop-types";

const ProfileOverview = ({ firstName, lastName, email }) => (
  <div>
    <h1>{`${firstName} ${lastName}`}</h1>
    <p>{email}</p>
  </div>
);

ProfileOverview.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileOverview;
