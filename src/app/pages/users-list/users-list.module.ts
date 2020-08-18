import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from './users-list.component';
import {
  NzAvatarModule,
  NzButtonModule,
  NzDividerModule,
  NzGridModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzTableModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {UserInfoModule} from '../user-info/user-info.module';
import {GetUserInfoPipe} from './get-user-info.pipe';


@NgModule({
  declarations: [
    UsersListComponent,
    GetUserInfoPipe,
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    RouterModule,
    NzButtonModule,
    NzTypographyModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzIconModule,
    UserInfoModule,
  ],
  exports: [UsersListComponent],
})
export class UsersListModule {
}
