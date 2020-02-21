import { Component, OnInit } from '@angular/core';

import { PoemsService } from 'src/app/services/poems.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from '../new-poem/new-poem.component';


@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.scss'],
})
export class PoemsComponent implements OnInit {
  poems: any;
  user: any;

  constructor(
    private poemsService: PoemsService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getPoems();
    this.getUser();
  }

  getUser() {
    this.authService.appUser$
      .subscribe(appUser => {
        this.user = appUser;
      });
  }

  getPoems() {
    this.poemsService.getPoems()
      .subscribe(data => {
        this.poems = data;
      });
  }

  onEditPoem(poem) {
    this.dialog.open(NewPoemComponent, {
      width: '80vh',
      data: poem
    });
  }

  onDeletePoem(poem) {
    this.poemsService.deletePoem(poem)
      .pipe(take(1))
      .subscribe();
  }
}
