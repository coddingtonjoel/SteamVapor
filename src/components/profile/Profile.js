import React from 'react';
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import {ScaleLoader} from "react-spinners";

//for <ScaleLoader/>
const override = css`
  display: block;
  margin: 0 auto;
  padding: 4%;
`;

const Profile = (props) => {
    if (props.loading) {
        return (
            <div className={"users-container profile"}>
                <ScaleLoader
                    css={override}
                    size={100}
                    color={"#444"}
                />
            </div>
        )
    }
    else {
        return (
            <div className={"profile"}>
                <img className={"avatar"} src={props.user.avatarUrl} alt=""/>
                <h4 className={"profile-title"}>
                    {props.user.name}
                </h4>
                <p className={"last-logoff"}>{props.user.lastLogoff}</p>
                {props.user.profileUrl ?
                    <a target={"_blank"} className={"profile-link btn"} href={props.user.profileUrl}>View Profile</a>
                    : <div className={"extra-padding-div"}/>}
            </div>
        );
    }
};

Profile.propTypes = {
    user: PropTypes.object.isRequired
};

export default Profile;