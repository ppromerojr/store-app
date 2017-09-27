import { SharedService } from './../../providers/shared.service';
import { IUser } from './../../providers/user.model';
import { AuthService } from './../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData = {
    username: '',
    password: ''
  };
  userDetails = {};

  loading: boolean = false;
  returnUrl: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService
  ) {

  }


  ngOnInit() {
    this.auth.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.shared._getData('users')
      .subscribe((res) => {
        console.log(this.userData);
        let users = res.data;

        users.find((user) => {
          if ((user.username === this.userData.username) && (user.password === this.userData.password)) {
            console.log('exists');
            this.userDetails['firstName'] = user.firstName;
            this.userDetails['lastName'] = user.lastName;
            this.userDetails['username'] = user.username;
            this.userDetails['isAdmin'] = user.isAdmin;
            localStorage.setItem('currentUser', JSON.stringify(this.userDetails));
            this.router.navigate([this.returnUrl]);
          }
        })

        this.loading = false;
      })
  }


}