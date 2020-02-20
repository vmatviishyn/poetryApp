import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from './components/new-poem/new-poem.component';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  onAddNewPoemDialogOpen() {
    this.dialog.open(NewPoemComponent, {
      width: '80vh',
    });
  }

  login() {
    this.authService.loginWithGoogle()
      .pipe(take(1))
      .subscribe(data => {
        console.log('Data - ', data);
      });
  }
}
