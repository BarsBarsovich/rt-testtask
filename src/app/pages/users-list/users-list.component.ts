/* tslint:disable:typedef */
import {Component, OnInit} from '@angular/core';
import {User, UsersService} from '../../services/users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  cols = COLS;

  constructor(
    private userService: UsersService
  ) {
    this.users$ = this.userService.getUsersList();
  }

  ngOnInit(): void {
  }

  deleteUser(guid: string) {
    this.userService.deleteUser(guid);
    this.users$ = this.userService.getUsersList();
  }

}

const COLS = [
  {
    title: 'Avatar'
  },
  {
    title: 'Initials'
  },
  {
    title: 'First Name',
    compare: (a: User, b: User) => (a?.name?.first > b?.name?.first) ? 1 : -1,
    priority: 3
  },
  {
    title: 'Last Name',
    compare: (a: User, b: User) => (a?.name?.last > b?.name?.last) ? 1 : -1,
    priority: 2
  },
  {
    title: 'Age',
    compare: (a: User, b: User) => a?.age - b?.age,
    priority: 1
  },
  {
    title: 'Email',
  },
  {
    title: 'Actions',
  }
];
