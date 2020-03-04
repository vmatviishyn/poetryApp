import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import { PoemsState } from '../reducers/poems.reducer';

export const getPoemsSelector = createSelector(
  fromReducers.getPoemsState,
  (state: PoemsState) => state.poems
);

export const getLikesSelector = createSelector(
  fromReducers.getPoemsState,
  (state: PoemsState) => state.likes
);

export const getCommentsSelector = createSelector(
  fromReducers.getPoemsState,
  (state: PoemsState) => state.comments
);

export const getActivePoemSelector = createSelector(
  fromReducers.getPoemsState,
  (state: PoemsState) => state.activePoem
);
