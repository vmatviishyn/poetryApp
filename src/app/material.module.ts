import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatRippleModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatRippleModule,
  ],
})
export class MaterialModule { }
