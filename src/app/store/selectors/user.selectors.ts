import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import * as fromReducers from '../reducers';

export const getUserSelector = createSelector(
  fromReducers.getUserState,
  (state: UserState) => state.user
);
