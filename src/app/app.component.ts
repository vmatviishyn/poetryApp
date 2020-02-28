import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from './components/new-poem/new-poem.component';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  user: any;
  notifications: any = [];
  userSubscription: Subscription;


  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.userSubscription = this.authService.appUser$
      .subscribe(appUser => {
        this.user = appUser;

        if (this.user) {
          this.notificationService.getNotifications()
            .subscribe((notifications: any) => {
              this.notifications = notifications.filter(notification => notification.userEmail !== this.user.email);
            });
        }
      });

  }

  onAddNewPoemDialogOpen() {
    this.dialog.open(NewPoemComponent, {
      width: '80vh',
    });
  }

  login() {
    this.authService.loginWithGoogle()
      .pipe(take(1))
      .subscribe();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onNotificationClick(notification: any) {
    this.notificationService.deleteNotification(notification).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/poem', notification.poemId]);
    });
  }

  onDeleteAllNotification() {
    this.notificationService.deleteNotifications().pipe(take(1)).subscribe();
  }
}
