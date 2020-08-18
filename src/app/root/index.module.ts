import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {Route, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NzDividerModule, NzGridModule, NzLayoutModule, NzMenuModule} from 'ng-zorro-antd';
import {UsersListComponent} from '../pages/users-list/users-list.component';
import {UsersListModule} from '../pages/users-list/users-list.module';
import {UsersService} from '../services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {UserInfoComponent} from '../pages/user-info/user-info.component';
import {UserInfoModule} from '../pages/user-info/user-info.module';


const routes: Route[] = [
  {path: '', component: UsersListComponent},
  {path: ':userId', component: UserInfoComponent},
];

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    NzLayoutModule,
    NzDividerModule,
    NzMenuModule,
    NzGridModule,
    UsersListModule,
    HttpClientModule,
    UserInfoModule,
  ],
  bootstrap: [IndexComponent],
  providers: [
    UsersService
  ]
})
export class IndexModule {
}
