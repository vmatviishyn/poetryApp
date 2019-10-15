import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';


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

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 144) {
      const element = document.getElementById('header');
      element.classList.add('sticky');
     } else {
      const element = document.getElementById('header');
      element.classList.remove('sticky');
     }
  }
}
