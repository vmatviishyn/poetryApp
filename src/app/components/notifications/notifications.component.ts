import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  @Input() notifications: any;
  @Input() user: any;

  @Output() deleteAllNotifications = new EventEmitter();
  @Output() notificationClick = new EventEmitter();

  constructor() { }

  onDeleteAllNotifications() {
    this.deleteAllNotifications.emit();
  }

  onNotificationClick(notification: any) {
    this.notificationClick.emit(notification);
  }
}
