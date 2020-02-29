import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
export class AppComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  user$: Observable<User>;

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

    this.user$ = this.store.select(fromStore.getUserSelector);
    this.notifications$ = this.store.select(fromStore.getNotificationsSelector);

    // this.notificationService.getNotifications()
    //   .subscribe((notifications: any) => {
    //     this.notifications = notifications.filter(notification => notification.userEmail !== this.user.email);
    //   });
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
}
