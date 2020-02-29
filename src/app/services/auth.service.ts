import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  loginWithGoogle(): Observable<any> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        const { displayName, photoURL, email } = userCredential.user;
        return of({
          name: displayName,
          photoURL,
          email
        });
      }));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  updateUser(name: string, photoURL: string, email: string): Observable<any> {
    const user = { name, photoURL, email };
    let firebaseUserData: firebase.User;

    return this.afAuth.authState
      .pipe(
        switchMap((userData: firebase.User) => {
          firebaseUserData = userData;
          return this.afs.doc(`users/${userData.uid}`).get();
        }),
        switchMap((document: any) => {
          const method = document.exists ? 'update' : 'set';
          return of(this.afs.doc(`users/${firebaseUserData.uid}`)[method](user));
        }),
        switchMap(() => of(user)),
      );
  }

  get(uid: string): Observable<any> {
    return this.afs.doc(`users/${uid}`).valueChanges();
  }
}
