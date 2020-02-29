import * as fromUser from './user.reducer';
import * as fromNotifications from './notifications.reducer';

export interface AppState {
  user: fromUser.UserState;
  notifications: fromNotifications.NotificationsState;
}

export const reducers = {
  user: fromUser.reducer,
  notifications: fromNotifications.reducer
};

export const getUserState = (state: AppState) => state.user;
export const getNotificationsState = (state: AppState) => state.notifications;
