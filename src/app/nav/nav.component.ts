import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from './../services/shared.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('checkbox') checkbox: ElementRef;

  isSearch: boolean;
  currency: string;
  terms: string;

  constructor(
    private shared: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  userID = this.shared.currentUser().id;
  currentUrl = this.shared.activeUrl;


  ngOnInit() {
    console.log(this.router);
    this.activatedRoute.params.subscribe(p => {
      console.log(p['id']);
    });
  }

  toggleSearchIcon() {
    this.isSearch = false;
  }

  isAdmin(): boolean {
    return (this.shared.currentUser().isAdmin);
  }

  toggleCurrency() {
    //  $ = false
    let currency = this.checkbox.nativeElement.checked;
    currency = (currency) ? 'PH' : 'US';
    localStorage.setItem('currency', currency);
    this.changeCurrency(currency);

  }

  changeCurrency(currency: string) {
    this.shared.changeCurrency(currency);
  }

  searchTerm() {
    this.shared.searchProducts(this.terms);
    this.router.navigate(['/products/search']);
  }

  getCurrency() {
    return localStorage.getItem('currency');
  }

}
