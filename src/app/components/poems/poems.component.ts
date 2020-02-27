import { Component, OnInit } from '@angular/core';
import { PoemsService } from 'src/app/services/poems.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.scss'],
})
export class PoemsComponent implements OnInit {
  poems$: Observable<any>;

  constructor(
    private poemsService: PoemsService,
  ) { }

  ngOnInit() {
    this.poems$ = this.poemsService.getPoems();
  }
}
