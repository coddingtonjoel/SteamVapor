import React from 'react';
import PropTypes from "prop-types";

const Profile = (props) => {
        return (
            <div className={"profile"}>
                <img className={"avatar"} src={props.user.avatarUrl} alt=""/>
                <h4 className={"profile-title"}>
                    {props.user.name}
                </h4>
                <a target={"_blank"} className={"profile-link btn"} href={props.user.profileUrl}>View Profile</a>
            </div>
        );
};

Profile.propTypes = {
    user: PropTypes.object.isRequired
};

export default Profile;