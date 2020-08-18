/* tslint:disable:typedef */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import uid from 'uid';


const storageKey = 'usersStorage';

@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUsersList(): Observable<User[]> {
    const users = JSON.parse(localStorage.getItem(storageKey));
    return (users)
      ? of(users)
      : this.http.get<User[]>('/assets/mates.json')
        .pipe(tap(items => localStorage.setItem(storageKey, JSON.stringify(items))));
  }

  deleteUser(guid: string) {
    let users = this.getFromStorage() || [];
    users = users.filter(user => user.guid !== guid);
    localStorage.setItem(storageKey, JSON.stringify(users));
  }

  getUserById(userId: string): User {
    const users = JSON.parse(localStorage.getItem(storageKey)) as User[];
    return users.find(({guid}) => guid === userId);
  }

  private getFromStorage(): User[] {
    return JSON.parse(localStorage.getItem(storageKey)) as User[];
  }

  updateUser(user: User) {
    const currentUsers = JSON.parse(localStorage.getItem(storageKey)) as User[];
    const userIndex = currentUsers.map(usr => usr.guid).indexOf(user.guid);
    currentUsers[userIndex] = user;
    localStorage.setItem(storageKey, JSON.stringify(currentUsers));
  }

  addUser(user: User): Observable<User> {
    user.guid = uid();
    const users = [...this.getFromStorage(), user];
    localStorage.setItem(storageKey, JSON.stringify(users));
    return of(user);
  }
}

export interface User {
  guid: string;
  age: number;
  email: string;
  name: {
    first: string;
    last: string;
  },
}
