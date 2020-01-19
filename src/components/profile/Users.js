import React from 'react';
import Profile from "./Profile";

const Users = (props) => {

    return (
        <div className={"users-container"}>
            {props.users.map(user => (
                <Profile key={user.name} user={user}/>
            ))}
        </div>
    );
};

export default Users;