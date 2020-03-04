import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from '../new-poem/new-poem.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountComponent {
  @Input() user: User;

  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  onAddNewPoemDialogOpen() {
    this.dialog.open(NewPoemComponent, {
      width: '80vh',
    });
  }

  onLogin() {
    this.login.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
