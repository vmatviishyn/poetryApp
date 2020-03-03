import { Notification } from '../../models/notification.model';
import * as fromActions from '../actions';

export interface NotificationsState {
  notifications: Notification[] | [];
  loaded: boolean;
  loading: boolean;
}

export const initialState: NotificationsState = {
  notifications: [],
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromActions.NotificationAction): NotificationsState {
  switch (action.type) {

    case fromActions.GET_NOTIFICATIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromActions.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: false,
        notifications: [
          ...action.payload
        ]
      };
    }
    case fromActions.GET_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.REMOVE_ALL_NOTIFICATIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromActions.REMOVE_ALL_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        notifications: []
      };
    }
    case fromActions.REMOVE_ALL_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.REMOVE_NOTIFICATION: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromActions.REMOVE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case fromActions.REMOVE_NOTIFICATION_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    default: {
      return state;
    }
  }
}
