import React, { useState, useEffect } from "react";
import "./Header.scss";
import { auth } from "../Login/firebase";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";

const Header = ({
  hide,
  month,
  selectedDate,
  getNextMonth,
  getPrevMonth,
  getToday,
}) => {
  const [{ user, saveData }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  const [status, setStatus] = useState();
  const toggleStatus = () => {
    setStatus(!status);
  };
  const [counterCurrent, setcounterCurrent] = useState(0);
  const [counterDone, setcounterDone] = useState(0);
  const [counterClosed, setcounterClosed] = useState(0);

  useEffect(() => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    let counterCurrent_sub = 0;
    let counterDone_sub = 0;

    saveData.map((el) => {
      const arrayDate = el.day.split("/");
      // console.log(arrayDate);

      if (
        arrayDate[0] - 1 == currentMonth &&
        arrayDate[2] == currentYear &&
        el.done == false &&
        new Date(arrayDate[2], arrayDate[0] - 1, arrayDate[1], 23, 59) >
        new Date()
      ) {
        counterCurrent_sub++;
      }
      if (
        arrayDate[0] - 1 == currentMonth &&
        arrayDate[2] == currentYear &&
        el.done == true &&
        new Date(arrayDate[2], arrayDate[0] - 1, arrayDate[1], 23, 59) >
        new Date()
      ) {
        counterDone_sub++;
      }

    });
    setcounterCurrent(counterCurrent_sub);
    setcounterDone(counterDone_sub);

    // console.log(currentMonth, currentYear);
  }, [saveData, selectedDate]);
  var gapi = window.gapi;
  var CLIENT_ID =
    "1069261108921-c8nbhmon6sleslvn4kafcfebmcvthb17.apps.googleusercontent.com";
  var API_KEY = "AIzaSyA_96eKmOSLVruyT65ANVJW5g3sioUUI3Q";

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar";

  // var authorizeButton = document.getElementById('authorize_button');
  // var signoutButton = document.getElementById('signout_button');

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        async function () {
          // const googleAuth = window.gapi.auth2.getAuthInstance();
          // const googleUser = await googleAuth.signIn();
          // await googleUser;
          // const token = googleUser.getAuthResponse().id_token;
          // console.log(googleUser);
          if (user) {
            listUpcomingEvents();
          } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("profile");
            provider.addScope("email");
            firebase
              .auth()
              .signInWithPopup(provider)
              .then(function (result) {
                // This gives you a Google Access Token.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                gapi.auth2
                  .getAuthInstance()
                  .isSignedIn.listen(updateSigninStatus);

                // Handle the initial sign-in state.
                updateSigninStatus(
                  gapi.auth2.getAuthInstance().isSignedIn.get()
                );

                var user = result.user;
                localStorage.setItem("user", JSON.stringify(user));
                // console.log(user);
                // dispatch({
                //   type: "SET_USER",
                //   user: user,
                // });
              });
          }
        },
        function (error) {
          // appendPre(JSON.stringify(error, null, 2));
        }
      );
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // authorizeButton.style.display = "none";
      // signoutButton.style.display = "block";
      listUpcomingEvents();
    } else {
      // authorizeButton.style.display = "block";
      // signoutButton.style.display = "none";
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  // function appendPre(message) {
  //   var pre = document.getElementById('content');
  //   var textContent = document.createTextNode(message + '\n');
  //   pre.appendChild(textContent);
  // }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    // console.log(user);
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date(2020, 9, 10).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response) {
        var events = response.result.items;
        // appendPre("Upcoming events:");
        console.log(events);
      });
  }

  function AddEventTest() {
    var event = {
      summary: "Awesome Event!",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "Really great refreshments",
      start: {
        dateTime: "2020-06-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2020-06-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    var request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    request.execute((event) => {
      console.log(event);
      window.open(event.htmlLink);
    });
  }

  useEffect(() => {
    console.log("УСТАНОВИЛИ В ЛОКАЛКУ");
    localStorage.setItem("events", JSON.stringify(saveData));
  }, [saveData]);

  // const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="header">
      <div className="layout-header-today">
        <span className="header__today" onClick={getToday}>
          Сегодня
        </span>
        <a onClick={handleClientLoad} className="header__link">
          Синхронизировать с Google
        </a>
      </div>
      <div className="layout-header-month">
        <span onClick={getPrevMonth}>
          <img
            src="/arrow.png"
            srcSet="/arrow@2x.png 2x, /arrow@3x.png 3x"
            className="Arrow"
            alt=""
          />
        </span>
        <p
          className="month"
          id={`${month[selectedDate.getMonth()]}.${selectedDate.getFullYear()}`}
        >{`${month[selectedDate.getMonth()]
          } - ${selectedDate.getFullYear()}`}</p>
        <span onClick={getNextMonth}>
          <img
            src="/arrow.png"
            srcSet="/arrow@2x.png 2x, /arrow@3x.png 3x"
            className="Arrow arrow-next"
            alt=""
          />
        </span>
      </div>
      <div className="layout-header-btns">
        <div className="layout-header-btns__item">
          <span className="circle done"></span>
          <span className="done-event">{counterCurrent}</span>
        </div>
        <div className="layout-header-btns__item">
          <span className="circle current"></span>
          <span className="done-current">{counterDone}</span>
        </div>

      </div>
      <div className="layout-header-register">
        <button
          className="button-sign"
          style={{ display: `${!user ? "" : "none"}` }}
          onClick={hide}
        >
          Войти
        </button>
        <div className="header__nav">
          <img
            className="user-photo"
            style={{ display: `${!user ? "none" : ""}` }}
            src={!user ? "" : user.photoURL}
          />
          <span
            className="nav"
            style={{ display: `${!user ? "none" : ""}` }}
            onClick={toggleStatus}
          ></span>
        </div>
        {status && user && (
          <div className="dropdown">
            <span className="user-email">
              Вошли в систему с помощью <b>{user.email}</b>{" "}
            </span>
            <span className="button-signOut" onClick={handleAuthenticaton}>
              Выйти
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
