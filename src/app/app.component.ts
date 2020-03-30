import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from './store';

import { User } from './models/user.model';
import { Notification } from './models/notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  user$: Observable<User>;

  constructor(
    private router: Router,
    private store: Store<fromStore.AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.GetUser());
    this.store.dispatch(new fromStore.GetNotifications());

    this.user$ = this.store.select(fromStore.getUserSelector);
    this.notifications$ = this.store.select(fromStore.getNotificationsFilterSelector);
  }

  onLogin() {
    this.store.dispatch(new fromStore.LoginUser());
  }

  onLogout() {
    this.store.dispatch(new fromStore.LogoutUser());
  }

  onNotificationClick(notification: Notification) {
    this.store.dispatch(new fromStore.RemoveNotification(notification));
    this.router.navigate(['/poem', notification.poemId]);
  }

  onRemoveAllNotifications() {
    this.store.dispatch(new fromStore.RemoveAllNotifications());
  }
}
