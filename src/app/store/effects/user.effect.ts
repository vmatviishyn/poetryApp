import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError} from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

import * as fromActions from '../actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
  ) { }

  @Effect()
  loginUser$ = this.actions.pipe(
    ofType(fromActions.LOGIN_USER),
    switchMap(() => {
      return this.authService.loginWithGoogle().pipe(
        switchMap((userInfo: User) => {
          const user: User = userInfo;
          return this.authService.updateUser(user.name, user.photoURL, user.email).pipe(
            map(() => new fromActions.LoginUserSuccess(user)),
            catchError(error => of(new fromActions.LoginUserFail(error)))
          );
        })
      );
    })
  );

  @Effect()
  getUser$ = this.actions.pipe(
    ofType(fromActions.GET_USER),
    switchMap(() => this.afAuth.authState.pipe(
      switchMap((firebaseUser: any) => {
        if (firebaseUser) {
          return this.authService.get(firebaseUser.uid).pipe(
            map((user: User) => new fromActions.GetUserSuccess(user)),
            catchError(error => of(new fromActions.GetUserFail(error)))
          );
        } else {
          return of(new fromActions.GetUserFail({}));
        }
      })
    ))
  );

}

