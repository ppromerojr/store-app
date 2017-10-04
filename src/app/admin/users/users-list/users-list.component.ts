import { Users } from './../../../interfaces/users';
import { UsersService } from './../../../services/users/users.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }

  isModal = false;

  AllUsers: Users[];

  ngOnInit() {
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.usersService.getAllUsers().subscribe((res) => this.AllUsers = res['data']);
  }



}
