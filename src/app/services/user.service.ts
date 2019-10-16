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
    private afauth: AngularFireAuth,
  ) { }

  updateUser(name: string, photoURL: string, isAdmin: boolean): Observable<any> {
    const user = { name, photoURL, isAdmin };

    return this.afauth.authState
      .pipe(
        // create new user or update existing with new session id
        switchMap((userData: firebase.User) => of(this.afs.doc(`users/${userData.uid}`).set(user))),
        switchMap(() => of(user)),
      );
  }
}
