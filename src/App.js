import React, { useState, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/profile/Users";
import "./App.css";
import "./components/profile/Profile.css";
import "./components/layout/Navbar.css";
import "./components/profile/Users.css";

//bypass CORS setup; snippet from https://github.com/Rob--W/cors-anywhere/blob/master/demo.html
let cors_api_url = "https://cors-anywhere.herokuapp.com/";
function doCORSRequest(options, getResult) {
  let x = new XMLHttpRequest();
  x.open("GET", cors_api_url + options.url);
  x.onload = x.onerror = function() {
    getResult(x.responseText);
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  x.send(options.data);
}

const App = () => {
  const [name, setName] = useState("Input a SteamID-64 to Begin!");
  const [lastLogoff, setLastLogoff] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [profileURL, setProfileURL] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = {
    key: process.env.REACT_APP_STEAM_API_KEY
  };

  //function to fetch API while bypassing CORS; from https://github.com/Rob--W/cors-anywhere/blob/master/demo.html
  const getAPI = url => {
    setLoading(true);
    doCORSRequest(
      {
        url: url
      },
      addUserInfo
    );
    setLoading(false);
  };

  //default API response for IDs without accounts linked to them
  const addUserInfo = result => {
    if (result === '{"response":{"players":[]}}') {
      setName("SteamID-64 not recognized.");
      setLastLogoff("");
      setProfileURL(false);
      setAvatarURL("");
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
        const timestamp = require("unix-timestamp");
        const lastLogoffUTC = timestamp.toDate(lastLogoffUNIX).toString();
        const lastLogoffDate = lastLogoffUTC.slice(0, 16);
        const lastLogoffTime = lastLogoffUTC.slice(17, 21);
        const lastLogoff = lastLogoffDate + " @ " + lastLogoffTime;

        setName(name);
        setAvatarURL(avatar);
        setProfileURL(url);
        setLastLogoff("Last Logoff: " + lastLogoff + " (PDT)");

        //in the rare event that the JSON does not include lastlogoff key
      } else {
        setName(name);
        setAvatarURL(avatar);
        setProfileURL(url);
        setLastLogoff("Last Logoff: null");
      }
    }
  };

  const userTypedHandler = event => {
    let idToSearch = event.target.value;
    if (idToSearch.length !== 17) {
      setName(17 - idToSearch.length + " digit(s) remaining...");
      setAvatarURL("");
      setLastLogoff("");
      setProfileURL(false);
    } else {
      setLoading(true);
      getAPI(
        "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" +
          api.key +
          "&steamids=" +
          idToSearch
      );
    }
  };

    return (
      <Fragment>
        <Navbar title={"STEAMVAPOR"} />
        <div className="container">
          <input
            type="text"
            onPaste={userTypedHandler}
            onChange={userTypedHandler}
            className={"search-bar form-control"}
            maxLength={17}
            placeholder={"SteamID-64 (17 Digits)"}
          />
          <Users loading={loading} name={name} avatarURL={avatarURL} profileURL={profileURL} lastLogoff={lastLogoff} />
        </div>
      </Fragment>
    );
};

export default App;
