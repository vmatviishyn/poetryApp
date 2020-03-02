import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import { PoemsState } from '../reducers/poems.reducer';

export const getPoemsSelector = createSelector(
  fromReducers.getPoemsState,
  (state: PoemsState) => state.poems
);
