import React, { useEffect, useState } from "react";
import "./App.scss";

import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/Modal/Modal";
import ModalEdit from "./components/ModalEdit/ModalEdit";
import useModal from "./components/Modal/useModal";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import { useStateValue } from "./StateProvider";
import { auth } from "./components/Login/firebase";
import CalendarUse from "./components/Calendar/useCalendar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";


const App = () => {

  const {
    days,
    month,
    todayDateFormatted,
    calendarRows,
    selectedDate,
    getNextMonth,
    getPrevMonth,
    getToday
  } = CalendarUse();

  const { isShowing, toggleModal } = useModal();
  const { isShowingEdit, toggleModalEdit } = useModal();
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [{ saveData }] = useStateValue();

  var gapi = window.gapi;
  var CLIENT_ID =
    "1069261108921-6ffjeieps8tps733qgjjuo1t3e3s972h.apps.googleusercontent.com";
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

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    console.log("УСТАНОВИЛИ В ЛОКАЛКУ");
    localStorage.setItem("events", JSON.stringify(saveData));
  }, [saveData]);

  const [{ user }, dispatch] = useStateValue();

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
    <Router>
      <button onClick={handleClientLoad}>SYNCRO</button>
      <Header
        hide={toggleLogin}
        month={month}
        selectedDate={selectedDate}
        getNextMonth={getNextMonth}
        getPrevMonth={getPrevMonth}
        hide={toggleLogin}
        getToday={getToday}
      ></Header>
      {isLogin && <Login hide={toggleLogin}></Login>}
      { user && <>
        <div className="section calendar">
          <Calendar
            days={days}
            month={month}
            todayDateFormatted={todayDateFormatted}
            calendarRows={calendarRows}
            selectedDate={selectedDate}
            getNextMonth={getNextMonth}
            getPrevMonth={getPrevMonth}
            getEventForEdit={(event) => setEventToEdit(event)}
            onCellClick={toggleModal}
            onCellClickEdit={toggleModalEdit}
          />
        </div>
        <Modal
          isShowing={isShowing}
          hide={toggleModal}
          closeModal={(el) => setEventToEdit(el)}
          days={days}
          month={month}
          selectedDate={selectedDate}
        />
        <ModalEdit
          isShowing={isShowingEdit}
          hide={toggleModalEdit}
          eventForEdit={eventToEdit}
          closeModal={(el) => setEventToEdit(el)}
          days={days}
          month={month}
          selectedDate={selectedDate}
        />
      </>
      }
    </Router>
  );
};

export default App;
