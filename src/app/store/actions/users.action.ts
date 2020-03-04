import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const LOGIN_USER = '[Users] Login User';
export const LOGIN_USER_SUCCESS = '[Users] Login User Success';
export const LOGIN_USER_FAIL = '[Users] Login User Fail';

export const LOGOUT_USER = '[Users] Logout User';
export const LOGOUT_USER_SUCCESS = '[Users] Logout User Success';
export const LOGOUT_USER_FAIL = '[Users] Logout User Fail';

export const GET_USER = '[Users] Get User';
export const GET_USER_SUCCESS = '[Users] Get User Success';
export const GET_USER_FAIL = '[Users] Get User Fail';

// LOGIN_USER
export class LoginUser implements Action {
  readonly type = LOGIN_USER;
}

export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: User) { }
}

export class LoginUserFail implements Action {
  readonly type = LOGIN_USER_FAIL;
  constructor(public payload: any) { }
}

// LOGOUT_USER
export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export class LogoutUserSuccess implements Action {
  readonly type = LOGOUT_USER_SUCCESS;
  constructor(public payload?: User) { }
}

export class LogoutUserFail implements Action {
  readonly type = LOGOUT_USER_FAIL;
  constructor(public payload?: any) { }
}

// GET_USER
export class GetUser implements Action {
  readonly type = GET_USER;
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;
  constructor(public payload: User) { }
}

export class GetUserFail implements Action {
  readonly type = GET_USER_FAIL;
  constructor(public payload: any) { }
}

export type UserAction =
  | LoginUser
  | LoginUserSuccess
  | LoginUserFail

  | LogoutUser
  | LogoutUserSuccess
  | LogoutUserFail

  | GetUser
  | GetUserSuccess
  | GetUserFail;
