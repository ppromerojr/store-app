import { Users } from './../../../interfaces/users';
import { UsersService } from './../../../services/users/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  currentUser: Users;
  AllUsers: Users[];

  userID = this.route.snapshot.params['id'];

  ngOnInit() {
    this.getUser(this.userID);
  }

  getAllUsers() {
    return this.usersService.getAllUsers().subscribe(res => this.AllUsers = res['data']);
  }

  getUser(id: number) {
    this.getAllUsers();
    setTimeout(() => {
      console.log(this.AllUsers);
      this.currentUser = this.AllUsers.find((obj) => {
        return obj.id === +id;
      });
    }, 100);
    // return this.AllUsers.find((obj) => { });
  }

}
