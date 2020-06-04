## Config File Instructions
```
Name the file : Fbconfig.js

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    Add the config key here
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots : true})

export default firebase
```
