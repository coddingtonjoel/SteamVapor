import React, {Component, Fragment} from 'react'
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
    state = {
        users: [{
            name: "Input a SteamID-64 to Begin!"
        }],
        loading: false
    };

    api = {
        key: process.env.REACT_APP_STEAM_API_KEY
    };

    //function to fetch API while bypassing CORS; from https://github.com/Rob--W/cors-anywhere/blob/master/demo.html
    getAPI = (url) => {
        this.setState({loading: true});
        doCORSRequest({
            url: url
        }, this.addUserInfo);
        this.setState({loading: false});

    };

    //default API response for IDs without accounts linked to them
    addUserInfo = (result) => {
        if (result === "{\"response\":{\"players\":[]}}") {
            this.setState({
                users: [
                    {
                        name: "SteamID-64 not recognized.",
                        lastLogoff: "",
                        profileUrl: false
                    }
                ]
            });
        }
        //parsing the returned JSON
        else {
            let newUser = JSON.parse(result);
            const name = newUser.response.players[0].personaname;
            const avatar = newUser.response.players[0].avatarfull;
            const url = newUser.response.players[0].profileurl;
            const lastLogoffUNIX = newUser.response.players[0].lastlogoff;

            //converting UNIX timestamp from API to nicely formatted date, time, & timezone
            if (Number.isInteger(lastLogoffUNIX)) {
                const timestamp = require('unix-timestamp');
                const lastLogoffUTC = timestamp.toDate(lastLogoffUNIX).toString();
                const lastLogoffDate = lastLogoffUTC.slice(0, 16);
                const lastLogoffTime = lastLogoffUTC.slice(17, 21);
                const lastLogoff = lastLogoffDate + " @ " + lastLogoffTime;

                this.setState({
                    users: [
                        {
                            name: name,
                            avatarUrl: avatar,
                            profileUrl: url,
                            lastLogoff: ("Last Logoff: " + lastLogoff + " (PDT)")
                        }
                    ]
                });
                //in the rare event that the JSON does not include lastlogoff key
            } else {
                this.setState({
                    users: [
                        {
                            name: name,
                            avatarUrl: avatar,
                            profileUrl: url,
                            lastLogoff: "Last Logoff: null"
                        }
                    ]
                });
            }
        }
    };

    userTypedHandler = (event) => {
        let idToSearch = event.target.value;
        if (idToSearch.length !== 17) {
            this.setState({
                users: [
                    {
                        name: (17 - idToSearch.length) + " digit(s) remaining..."
                    }
                ]
            })
        }
        else {
            this.setState({ loading: true });
            this.getAPI("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + this.api.key + "&steamids=" + idToSearch);
        }
    };

    render() {
        return (
            <Fragment>
                <Navbar title={"STEAMVAPOR"}/>
                <div className="container">
                    <input type="text" onPaste={this.userTypedHandler} onChange={this.userTypedHandler} className={"search-bar form-control"} maxLength={17} placeholder={"SteamID-64 (17 Digits)"}/>
                    <Users loading={this.state.loading} users={this.state.users}/>
                </div>
            </Fragment>
        );
    }
}

export default App;
