var firebaseConfig = {
  apiKey: "AIzaSyBODGUoOS6Wo4VFsTXCOk-ZmF01WiZ_XGk",
  authDomain: "realtime-comment-system.firebaseapp.com",
  projectId: "realtime-comment-system",
  storageBucket: "realtime-comment-system.appspot.com",
  messagingSenderId: "489222106751",
  appId: "1:489222106751:web:ddb717d6eb761f90ed594a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      console.log(credential);
      var token = credential.accessToken;
      var user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

const form = document.getElementById("comments");
// adding data to db
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("comments").add({
    name: form.name.value,
    comment: form.comment.value,
  });
  form.name.value = "";
  form.comment.value = "";
});

// reading from db

const div = document.querySelector(".cont");

const renderList = (doc) => {
  var main_div = document.createElement("div");
  var card_body = document.createElement("div");
  var name = document.createElement("h5");
  var comment = document.createElement("p");
  main_div.setAttribute("class", "card mt-3");
  card_body.setAttribute("class", "card-body");
  name.setAttribute("class", "card-title");
  comment.setAttribute("class", "card-text");
  name.textContent = doc.data().name;
  comment.textContent = doc.data().comment;
  card_body.appendChild(name);
  card_body.appendChild(comment);
  main_div.appendChild(card_body);
  div.appendChild(main_div);
};

db.collection("comments").onSnapshot((snap) => {
  let changes = snap.docChanges();
  changes.forEach((change) => {
    if (change.type == "added") {
      renderList(change.doc);
    }
  });
});
