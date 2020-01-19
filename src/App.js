import React, {Component, Fragment} from 'react';
import Navbar from "./components/layout/Navbar"
import Users from "./components/profile/Users"
import "./App.css";
import "./components/profile/Profile.css"
import "./components/layout/Navbar.css"
import "./components/profile/Users.css"

class App extends Component {
    constructor(props) {
        super(props);
        let steamuserinfo = require("steam-userinfo");
        steamuserinfo.setup(this.api.key);
    }

    api = {
        key: "4E6ADE42223909E74302F1FC6694E58C",
        steamID: 76561198103184138
    };

    componentDidMount() {
        const res = fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.api.key + '&steamids=' + this.api.id, {mode: "cors"});
        console.log(res.data);
    }

    userTypedHandler(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <Fragment>
                <Navbar title={"STEAMVAPOR"}/>
                <div className="container">
                    <input type="text" onChange={this.userTypedHandler} className={"search-bar form-control"} placeholder={"Steam Username Lookup"}/>
                    <Users/>
                </div>
            </Fragment>
        );
    }
}

export default App;
