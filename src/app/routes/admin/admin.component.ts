import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-layout',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
