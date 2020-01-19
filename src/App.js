import React, {Component, Fragment} from 'react';
import Navbar from "./components/layout/Navbar"
import Users from "./components/profile/Users"
import "./App.css";
import "./components/profile/Profile.css"
import "./components/layout/Navbar.css"
import "./components/profile/Users.css"

class App extends Component {

    api = {
        key: "4E6ADE42223909E74302F1FC6694E58C",
        steamID: 76561198103184138
    };

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.api.key + '&steamids=' + this.api.id, {mode: "cors"}).then(res => console.log(res.data));
    }

    render() {
        return (
            <Fragment>
                <Navbar title={"STEAMVAPOR"}/>
                <div className="container">
                    <Users/>
                </div>
            </Fragment>
        );
    }
}

export default App;
