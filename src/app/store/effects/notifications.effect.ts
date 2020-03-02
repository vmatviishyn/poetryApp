import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { NotificationService } from 'src/app/services/notification.service';
import { map, switchMap, catchError, pluck } from 'rxjs/operators';
import { Notification } from '../../models/notification.model';
import { of } from 'rxjs';
import * as fromActions from '../actions';

@Injectable()
export class NotificationEffects {

  constructor(
    private actions: Actions,
    private notificationService: NotificationService
  ) { }

  @Effect()
  getNotifications$ = this.actions.pipe(
    ofType(fromActions.GET_NOTIFICATIONS),
    switchMap(() => {
      return this.notificationService.getNotifications().pipe(
        map((notifications: Notification[]) => new fromActions.GetNotificationsSuccess(notifications)),
        catchError(error => of(new fromActions.GetNotificationsFail(error)))
      );
    })
  );

  // addNotification$ = this.actions.pipe(
  //   ofType(fromActions.ADD_NOTIFICATION),
  //   pluck('payload'),
  //   switchMap((notification: Notification) => {
  //     return this.notificationService.addNotification(notification).pipe(
  //       map(notification => new fromActions.AddNotificationSuccess(notification))
  //     );
  //   })
  // );
}
