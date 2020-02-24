import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatBadgeModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
  ],
})
export class MaterialModule { }
