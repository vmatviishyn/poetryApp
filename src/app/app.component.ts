import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { Router, NavigationEnd } from '@angular/router';

import { Store } from '@ngrx/store';

import { User } from './models/user.model';
import { Notification } from './models/notification.model';

import * as fromActions from './store/actions';
import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  notifications: Notification[];
  user: User;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private store: Store<fromStore.AppState>,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.store.dispatch(new fromActions.GetUser());
    this.store.dispatch(new fromActions.GetNotifications());

    this.store.select(fromStore.getUserSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        this.user = user;

        this.store.select(fromStore.getNotificationsSelector)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((notifications: Notification[]) => {
            this.notifications = notifications.filter((notification: Notification) => notification?.userEmail !== this.user?.email);
          });
      });
  }

  onLogin() {
    this.store.dispatch(new fromActions.LoginUser());
  }

  onLogout() {
    this.store.dispatch(new fromActions.LogoutUser());
  }

  onNotificationClick(notification: any) {
    this.notificationService.deleteNotification(notification).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/poem', notification.poemId]);
    });
  }

  onDeleteAllNotifications() {
    this.notificationService.deleteNotifications().pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
