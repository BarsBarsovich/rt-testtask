import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from './user-info.component';
import {ReactiveFormsModule} from '@angular/forms';
import {en_US, NZ_I18N, NzButtonModule, NzFormModule, NzGridModule, NzInputModule, NzModalService, NzWaveModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzInputModule,
    NzFormModule,
    NzWaveModule,
    NzButtonModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    NzModalService
  ]
})
export class UserInfoModule {
}
