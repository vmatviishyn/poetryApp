import * as fromUser from './user.reducer';
import * as fromNotifications from './notifications.reducer';
import * as fromPoems from './poems.reducer';

export interface AppState {
  user: fromUser.UserState;
  notifications: fromNotifications.NotificationsState;
  poems: fromPoems.PoemsState;
}

export const reducers = {
  user: fromUser.reducer,
  notifications: fromNotifications.reducer,
  poems: fromPoems.reducer
};

export const getUserState = (state: AppState) => state.user;
export const getNotificationsState = (state: AppState) => state.notifications;
export const getPoemsState = (state: AppState) => state.poems;
