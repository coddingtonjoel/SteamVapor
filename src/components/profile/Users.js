import React from "react";
import Profile from "./Profile";
import PropTypes from "prop-types";

const Users = props => {
  return (
    <div className={"users-container"}>
        <Profile loading={props.loading} key={props.name} name={props.name} avatarURL={props.avatarURL} profileURL={props.profileURL} lastLogoff={props.lastLogoff} />
    </div>
  );
};

Users.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Users;
