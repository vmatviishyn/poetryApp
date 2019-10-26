import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { PoemsService } from 'src/app/services/poems.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.scss'],
  animations: [
    trigger('fade',
      [
        state('void', style({ opacity : 0.7})),
        transition(':enter', [ animate(900)]),
        transition(':leave', [ animate(900)]),
      ]
    )
  ],
})
export class PoemsComponent implements OnInit {
  poems: any;

  constructor(
    @Inject(DOCUMENT) document,
    private poemsService: PoemsService
  ) { }

  ngOnInit() {
    this.getPoems();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    console.log('sdv');
    if (window.pageYOffset > 144) {
      const element = document.getElementById('header');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('header');
      element.classList.remove('sticky');
    }
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
