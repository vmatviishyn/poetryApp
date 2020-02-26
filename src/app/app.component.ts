import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from './components/new-poem/new-poem.component';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  user: any;
  notifications: any;
  userSubscription: Subscription;


  ngOnInit() {
    this.userSubscription = this.authService.appUser$
      .subscribe(appUser => {
        this.user = appUser;

        this.notificationService.getNotification()
          .subscribe((notifications: any) => {
            this.notifications = notifications.filter(notification => notification.userEmail !== this.user.email);
            console.log(this.notifications);
          });
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
}
