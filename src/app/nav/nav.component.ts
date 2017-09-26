import { SharedService } from './../providers/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit() {
  }

}
