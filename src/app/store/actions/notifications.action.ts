import { Action } from '@ngrx/store';
import { Notification } from '../../models/notification.model';

export const GET_NOTIFICATIONS = '[Notifications] Get Notifications';
export const GET_NOTIFICATIONS_SUCCESS = '[Notifications] Get Notifications Success';
export const GET_NOTIFICATIONS_FAIL = '[Notifications] Get Notifications Fail';

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

export type NotificationAction =
  | GetNotifications
  | GetNotificationsSuccess
  | GetNotificationsFail;
