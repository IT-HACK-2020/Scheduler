import firebase from "firebase";

class AuthService {
  constructor() {}

  initClient() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        apiKey: "AIzaSyCKeFj5sG04B77mhvoWddhlbjUt55BlVtk",
        clientId:
          "1069261108921-6ffjeieps8tps733qgjjuo1t3e3s972h.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar",
      });
      window.gapi.client.load("calendar", "v3", () => {
        console.log("loaded calrendar");
      });
    });
  }
  async login() {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;
    console.log(googleUser, token);

    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    // await firebase.auth().signInWithCredesntial(credential);

    // const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider.credential(
      token
    );
    const signInWithGoogle = async () => {
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    signInWithGoogle();
  }
  async getEvents() {
    console.log(
      window.gapi.client.calendar.events.list({
        calendarId: "primary",
        showDeleted: false,
        maxResults: 10,
        singleEvents: true,
      })
    );
  }
}

export const authServ = new AuthService();
