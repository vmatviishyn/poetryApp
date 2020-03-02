import { Action } from '@ngrx/store';
import { Notification } from '../../models/notification.model';

export const GET_NOTIFICATIONS = '[Notifications] Get Notifications';
export const GET_NOTIFICATIONS_SUCCESS = '[Notifications] Get Notifications Success';
export const GET_NOTIFICATIONS_FAIL = '[Notifications] Get Notifications Fail';

export const ADD_NOTIFICATION = '[Notifications] Add Notification';
export const ADD_NOTIFICATION_SUCCESS = '[Notifications] Add Notification Success';
export const ADD_NOTIFICATION_FAIL = '[Notifications] Add Notification Fail';

// GET_NOTIFICATIONS
export class GetNotifications implements Action {
  readonly type = GET_NOTIFICATIONS;
}

export class GetNotificationsSuccess implements Action {
  readonly type = GET_NOTIFICATIONS_SUCCESS;
  constructor(public payload: Notification[]) { }
}

export class GetNotificationsFail implements Action {
  readonly type = GET_NOTIFICATIONS_FAIL;
  constructor(public payload: any) { }
}

// ADD_NOTIFICATION
export class AddNotification implements Action {
  readonly type = ADD_NOTIFICATION;
}

export class AddNotificationSuccess implements Action {
  readonly type = ADD_NOTIFICATION_SUCCESS;
  constructor(public payload: Notification) { }
}

export class AddNotificationFail implements Action {
  readonly type = ADD_NOTIFICATION_FAIL;
  constructor(public payload: any) { }
}

export type NotificationAction =
  | GetNotifications
  | GetNotificationsSuccess
  | GetNotificationsFail

  | AddNotification
  | AddNotificationSuccess
  | AddNotificationFail;
