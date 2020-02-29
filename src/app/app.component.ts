import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { Router, NavigationEnd } from '@angular/router';

import { Store } from '@ngrx/store';
import { LoginUser, GetUser } from './store/actions';
import { User } from './models/user.model';

import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // user: User;
  notifications: any = [];
  // userSubscription: Subscription;

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

    this.store.dispatch(new GetUser());
    this.user$ = this.store.select(fromStore.getUserSelector);

    // this.notificationService.getNotifications()
    //   .subscribe((notifications: any) => {
    //     this.notifications = notifications.filter(notification => notification.userEmail !== this.user.email);
    //   });
  }

  onLogin() {
    this.store.dispatch(new LoginUser());
  }

  onLogout() {
    // this.authService.logout();
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
