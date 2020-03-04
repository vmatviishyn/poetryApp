import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
