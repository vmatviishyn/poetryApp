import { createSelector } from '@ngrx/store';
import { NotificationsState } from '../reducers/notifications.reducer';
import * as fromReducers from '../reducers';

export const getNotificationsSelector = createSelector(
  fromReducers.getNotificationsState,
  (state: NotificationsState) => state.notifications
);
