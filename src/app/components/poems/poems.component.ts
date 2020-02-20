import { Component, OnInit } from '@angular/core';

import { PoemsService } from 'src/app/services/poems.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.scss'],
})
export class PoemsComponent implements OnInit {
  poems: any;

  constructor(
    private poemsService: PoemsService
  ) { }

  ngOnInit() {
    this.getPoems();
  }

  getPoems() {
    this.poemsService.getPoems()
      .subscribe(data => {
        this.poems = data;
      });
  }

  onEditPoem(poem) {
    console.log(poem);
  }

  onDeletePoem(poem) {
    this.poemsService.deletePoem(poem)
    .pipe(take(1))
    .subscribe(data => {
      console.log(data);
    });
  }
}
