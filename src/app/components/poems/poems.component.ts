import { Component, OnInit } from '@angular/core';

import { PoemsService } from 'src/app/services/poems.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.scss'],
})
export class PoemsComponent implements OnInit {
  poems: any;

  constructor(
    private poemsService: PoemsService,
  ) { }

  ngOnInit() {
    this.poemsService.getPoems()
    .subscribe(data => {
      this.poems = data;
    });
  }
}
