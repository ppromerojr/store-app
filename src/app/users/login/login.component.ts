import { Users } from './../../interfaces/users';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth.service';
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

  loading: boolean;
  isError: boolean;
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

        const users = res.data;

        users.find((user) => {
          console.log('exists 1');
          if ((user.username === this.userData.username) && (user.password === this.userData.password)) {
            this.userDetails['id'] = user.id;
            this.userDetails['firstName'] = user.firstName;
            this.userDetails['lastName'] = user.lastName;
            this.userDetails['username'] = user.username;
            this.userDetails['isAdmin'] = user.isAdmin;
            localStorage.setItem('currentUser', JSON.stringify(this.userDetails));
            this.router.navigate([this.returnUrl]);
            this.isError = false;
          } else {
            console.log('does not exists');
            this.isError = true;
          }
        });

        this.loading = false;
      });
  }

}
