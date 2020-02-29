import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() user: any;
  @Input() notifications: any;

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
