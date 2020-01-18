import React, {Component} from 'react';
import Profile from "./Profile";

class Users extends Component {
    state = {
        users: [
            {
                id: 76561198103184138,
                name: "YepThatsMahogany",
                profileUrl: "https://steamcommunity.com/id/YepThatsMahogany/",
                avatarUrl: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a5/a5de07d6a92a8d75e1443d85604d3909b2aa0a0b_full.jpg"
            },
            {
                id: 76561198103184138,
                name: "YepThatsMahogay",
                profileUrl: "https://steamcommunity.com/id/YepThatsMahogany/",
                avatarUrl: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a5/a5de07d6a92a8d75e1443d85604d3909b2aa0a0b_full.jpg"
            },
            {
                id: 76561198103184138,
                name: "YepThatsMhogany",
                profileUrl: "https://steamcommunity.com/id/YepThatsMahogany/",
                avatarUrl: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a5/a5de07d6a92a8d75e1443d85604d3909b2aa0a0b_full.jpg"
            },
            {
                id: 76561198103184138,
                name: "YepThasMahogany",
                profileUrl: "https://steamcommunity.com/id/YepThatsMahogany/",
                avatarUrl: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a5/a5de07d6a92a8d75e1443d85604d3909b2aa0a0b_full.jpg"
            }
        ]
    };
    render() {
        return (
            <div className={"users-container"}>
                {this.state.users.map(user => (
                    <Profile key={user.name} user={user}/>
                ))}
            </div>
        );
    }
}

export default Users;