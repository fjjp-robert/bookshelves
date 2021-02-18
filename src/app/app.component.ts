import { Component } from '@angular/core';
import firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookshelves';

  constructor () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyD2Szymuz75GHWVDqDM9cmqK44SQykbI40",
      authDomain: "bookshelves-c8536.firebaseapp.com",
      projectId: "bookshelves-c8536",
      storageBucket: "bookshelves-c8536.appspot.com",
      messagingSenderId: "644143255074",
      appId: "1:644143255074:web:67ed246ddd8394e1af047b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
