import * as fromUser from './user.reducer';

export interface AppState {
  user: fromUser.UserState;
}

export const reducers = {
  user: fromUser.reducer
};

export const getUserState = (state: AppState) => state.user;
