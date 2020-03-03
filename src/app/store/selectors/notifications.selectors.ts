import { createSelector } from '@ngrx/store';
import { NotificationsState } from '../reducers/notifications.reducer';
import * as fromReducers from '../reducers';

import { Notification } from '../../models/notification.model';
import { User } from '../../models/user.model';
import { getUserSelector } from './user.selectors';



export const getNotificationsSelector = createSelector(
  fromReducers.getNotificationsState,
  (state: NotificationsState) => state.notifications
);

export const getNotificationsFilterSelector = createSelector(
  getNotificationsSelector,
  getUserSelector,
  (notifications: Notification[], user: User) => {
    return notifications.filter((notification: Notification) => notification?.userEmail !== user?.email);
  }
);
