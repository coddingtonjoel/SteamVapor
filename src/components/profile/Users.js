import React from 'react';
import Profile from "./Profile";
import PropTypes from "prop-types";

const Users = (props) => {
    return (
        <div className={"users-container"}>
            {props.users.map(user => (
                <Profile loading={props.loading} key={user.name} user={user}/>))}
        </div>
    );
};

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
};

export default Users;