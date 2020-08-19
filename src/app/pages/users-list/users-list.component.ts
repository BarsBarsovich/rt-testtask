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
  headerCols = HEADER_COLS;

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

const HEADER_COLS = [
  {
    title: 'Avatar'
  },
  {
    title: 'Initials'
  },
  {
    title: 'First Name',
    priority: 3
  },
  {
    title: 'Last Name',
    priority: 2
  },
  {
    title: 'Age',
    priority: 1
  },
  {
    title: 'Email',
  },
  {
    title: 'Actions',
  }
];
