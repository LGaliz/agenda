import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  hasVerifiedEmail = true;

  constructor(public afAuth: AngularFireAuth) {
    this.userSignIn();
  }

  userSignIn() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
      }
    });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }

  reload() {
    window.location.reload();
  }
}
