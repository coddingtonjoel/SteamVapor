import React, {Component, Fragment} from 'react';
import Navbar from "./components/layout/Navbar"
import Users from "./components/profile/Users"
import "./App.css";
import "./components/profile/Profile.css"
import "./components/layout/Navbar.css"
import "./components/profile/Users.css"

//bypass CORS setup; snippet from https://github.com/Rob--W/cors-anywhere/blob/master/demo.html
let cors_api_url = 'https://cors-anywhere.herokuapp.com/';
function doCORSRequest(options, getResult) {
    let x = new XMLHttpRequest();
    x.open('GET', cors_api_url + options.url);
    x.onload = x.onerror = function() {
        getResult(x.responseText);
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}

class App extends Component {
    //function to fetch API while bypassing CORS; from https://github.com/Rob--W/cors-anywhere/blob/master/demo.html
    getAPI = (url) => {
        doCORSRequest({
            url: url
        }, this.addUserInfo);
    };

    state = {
      users: [],
      loading: false,
    };

    api = {
        key: "4E6ADE42223909E74302F1FC6694E58C",
        steamID: 76561198103184138
    };

    addUserInfo = (result) => {
        let newUser = JSON.parse(result);

        const name = newUser.response.players[0].personaname;
        const avatar = newUser.response.players[0].avatarfull;
        const url = newUser.response.players[0].profileurl;

        this.setState({users: [
                {
                    name: name,
                    avatarUrl: avatar,
                    profileUrl: url
                }
            ]});
    };

    componentDidMount() {
        this.setState({loading: true});
        this.getAPI("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + this.api.key + "&steamids=" + this.api.steamID);
    }

    userTypedHandler(event) {
        if (event.target.value !== "")
            this.api.steamID = event.target.value;
    }

    render() {
        return (
            <Fragment>
                <Navbar title={"STEAMVAPOR"}/>
                <div className="container">
                    <input type="text" onChange={this.userTypedHandler} className={"search-bar form-control"} placeholder={"Steam Username Lookup"}/>
                    <Users loading={this.state.loading} users={this.state.users}/>
                </div>
            </Fragment>
        );
    }
}

export default App;
