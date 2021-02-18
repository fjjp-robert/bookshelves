import { Injectable } from '@angular/core';
import firebase from 'firebase'

@Injectable()
export class AuthService {

  constructor() { }

  // création d'un nouvel utilisateur avec email password
  createNewUser(email:string, password:string) {
    // promise car l'appel à firebase prend du temps => méthode asynchrone
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (userCredential) => {
            resolve(userCredential);
          }, 
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email:string, password:string) {
    // promise car l'appel à firebase prend du temps => méthode asynchrone
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (userCredential) => {
            resolve(userCredential);
          }, 
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
