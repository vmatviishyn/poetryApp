import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';


@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.scss'],
})
export class PoemsComponent implements OnInit {
  poems$: Observable<any>;

  constructor(
    private store: Store<fromStore.AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.GetPoems());
    this.poems$ = this.store.select(fromStore.getPoemsSelector);
  }
}
