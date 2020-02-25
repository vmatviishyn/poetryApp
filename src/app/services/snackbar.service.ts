import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  duration = 5000;

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: this.duration
    });
  }

  hideSnackbar() {
    this.snackBar.dismiss();
  }
}
