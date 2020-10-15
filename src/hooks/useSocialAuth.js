export default function useSocialAuth(props) {
  const google = async () => {
    var provider = new window.firebase.auth.GoogleAuthProvider();
    if (props) {
      if (props.scope) {
        props.scope.map((scope) => {
          provider.addScope(scope);
        });
      }
    }

    // Google Sign in
    return await window.firebase.auth().signInWithPopup(provider);
  };

  const facebook = async () => {
    var provider = new window.firebase.auth.FacebookAuthProvider();
    if (props) {
      if (props.scope) {
        props.scope.map((scope) => {
          provider.addScope(scope);
        });
      }
    }

    return await window.firebase.auth().signInWithPopup(provider);
  };

  return { runGoogle: google, runFacebook: facebook };
}

export function firebaseInit(firebaseConfig) {
  // Initialize Firebase

  try {
    window.firebase.initializeApp(firebaseConfig);
    window.firebase.analytics();
  } catch (e) {}
}

//useSocialAuth({scope: []})
// var firebaseConfig = {
//     apiKey: "AIzaSyC_U0YcUQcj_GvcNW4yDT4kH5UGJ7v25Oc",
//     authDomain: "test-57e4e.firebaseapp.com",
//     databaseURL: "https://test-57e4e.firebaseio.com",
//     projectId: "test-57e4e",
//     storageBucket: "test-57e4e.appspot.com",
//     messagingSenderId: "827256107469",
//     appId: "1:827256107469:web:56a78296977e9347d21484",
//     measurementId: "G-HV6FNMSPZY",
//   };

// <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>

// <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
// <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js"></script>

// <!-- Add Firebase products that you want to use -->
// <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js"></script>
