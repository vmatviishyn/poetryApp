import { Action } from '@ngrx/store';
import { Notification } from '../../models/notification.model';

export const GET_NOTIFICATIONS = '[Notifications] Get Notifications';
export const GET_NOTIFICATIONS_SUCCESS = '[Notifications] Get Notifications Success';
export const GET_NOTIFICATIONS_FAIL = '[Notifications] Get Notifications Fail';

export const REMOVE_ALL_NOTIFICATIONS = '[Notifications] Remove All Notifications';
export const REMOVE_ALL_NOTIFICATIONS_SUCCESS = '[Notifications] Remove All Notifications Success';
export const REMOVE_ALL_NOTIFICATIONS_FAIL = '[Notifications] Remove All Notifications Fail';

export const REMOVE_NOTIFICATION = '[Notifications] Remove Notification';
export const REMOVE_NOTIFICATION_SUCCESS = '[Notifications] Remove Notification Success';
export const REMOVE_NOTIFICATION_FAIL = '[Notifications] Remove Notification Fail';

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

// REMOVE_ALL_NOTIFICATION
export class RemoveAllNotifications implements Action {
  readonly type = REMOVE_ALL_NOTIFICATIONS;
}
export class RemoveAllNotificationsSuccess implements Action {
  readonly type = REMOVE_ALL_NOTIFICATIONS_SUCCESS;
  constructor(public payload?: any) { }
}
export class RemoveAllNotificationsFail implements Action {
  readonly type = REMOVE_ALL_NOTIFICATIONS_FAIL;
  constructor(public payload: any) { }
}

// REMOVE_ALL_NOTIFICATION
export class RemoveNotification implements Action {
  readonly type = REMOVE_NOTIFICATION;
  constructor(public payload: Notification) { }
}
export class RemoveNotificationSuccess implements Action {
  readonly type = REMOVE_NOTIFICATION_SUCCESS;
  constructor(public payload?: any) { }
}
export class RemoveNotificationFail implements Action {
  readonly type = REMOVE_NOTIFICATION_FAIL;
  constructor(public payload: any) { }
}

export type NotificationAction =
  | GetNotifications
  | GetNotificationsSuccess
  | GetNotificationsFail

  | RemoveAllNotifications
  | RemoveAllNotificationsSuccess
  | RemoveAllNotificationsFail

  | RemoveNotification
  | RemoveNotificationSuccess
  | RemoveNotificationFail;

