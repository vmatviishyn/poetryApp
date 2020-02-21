import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  updateUser(name: string, photoURL: string, email: string): Observable<any> {
    const user = { name, photoURL, email };
    let firebaseUserData: firebase.User;

    return this.afAuth.authState
      .pipe(
        switchMap((userData: firebase.User) => {
          firebaseUserData = userData;
          return this.afs.doc(`users/${userData.uid}`).get()
        }),
        switchMap((document: any) => {
          let method = document.exists ? 'update' : 'set';
          return of(this.afs.doc(`users/${firebaseUserData.uid}`)[method](user))
        }),
        switchMap(() => of(user)),
      );
  }

  get(uid: string): Observable<any> {
    return this.afs.doc(`users/${uid}`).valueChanges();
  }
}
