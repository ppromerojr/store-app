import { UsersListComponent } from './../users-list/users-list.component';
import { UsersService } from './../../../services/users/users.service';
import { SharedService } from './../../../services/shared.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  constructor(
    private Shared: SharedService,
    private Users: UsersService,
    private UsersList: UsersListComponent
  ) { }

  UserForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  username: FormControl;
  isAdmin: FormControl;
  password: FormControl;
  password1: FormControl;

  ngOnInit() {

    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.username = new FormControl('', Validators.required);
    this.isAdmin = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.password1 = new FormControl('', [Validators.required]);

    this.UserForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      isAdmin: this.isAdmin,
      password: this.password,
      password1: this.password1,
    });


  }

  ValidateName() {
    return this.firstName.invalid && this.firstName.touched;
  }
  ValidateLastName() {
    return this.lastName.invalid && this.lastName.touched;
  }
  ValidateUsername() {
    return this.username.invalid && this.username.touched;
  }
  ValidateIsAdmin() {
    return this.isAdmin.invalid && this.isAdmin.touched;
  }
  ValidatePassword() {
    return this.password.invalid && this.password.touched;
  }
  ValidateConfirmPassword() {
    return this.password1.invalid && this.password1.touched;
  }
  isPasswordMatched() {
    if (this.password.value !== this.password1.value) {
      return true;
    }
  }


  AddUser(FormValues) {
    this.Shared._postData(FormValues, 'users')
      .subscribe((res) => {
        this.UsersList.GetAllUsers();
        this.Close();
        this.UserForm.reset();
      });
  }

  Close() {
    const el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

}
