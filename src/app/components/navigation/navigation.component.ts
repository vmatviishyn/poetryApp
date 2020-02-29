import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models/user.model';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() user: User;
  @Input() notifications: Notification[];

  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() deleteAllNotifications = new EventEmitter();
  @Output() notificationClick = new EventEmitter();

  constructor() { }

  onLogin() {
    this.login.emit();
  }

  onLogout() {
    this.logout.emit();
  }

  onDeleteAllNotifications() {
    this.deleteAllNotifications.emit();
  }

  onNotificationClick(notification: any) {
    this.notificationClick.emit(notification);
  }
}
