import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  loginWithGoogle(): Observable<any> {
    // login to the system using google authentication
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        // save user and session id to database
        const { displayName, photoURL, email } = userCredential.user;

        return this.userService.updateUser(displayName, photoURL, email);
      }));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<any>{
    return this.user$.pipe(
      switchMap(user => {
        return user
          ? this.userService.get(user.uid)
          : of(null);
      })
    )
  }
}
