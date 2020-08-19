/* tslint:disable:typedef */
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UsersService} from '../../services/users.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {tap} from 'rxjs/operators';
import {NzModalService} from 'ng-zorro-antd';

@UntilDestroy()
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  editMode = false;

  userFg = new FormGroup({
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    guid: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.pattern(/.+@.+\..+/i)]),
  });


  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private userService: UsersService,
    private modal: NzModalService,
  ) {
    this.ac.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {

        const userId = params.userId;
        this.editMode = userId !== 'new';

        if (this.editMode) {
          const user = this.userService.getUserById(userId);
          if (user) {
            this.resetForm(user);
          }
        } else {
          this.userFg.reset();
        }
      });
  }

  ngOnInit(): void {

  }

  submitForm() {
    let currentUser = this.fillUserModel();
    this.editMode ?
      this.userService.updateUser(currentUser)
        .pipe(tap(() => {
          this.showModal('Данные обновлены');
        })).toPromise() :
      this.userService.addUser(currentUser)
        .pipe(
          tap((user) => {
            currentUser = user;
            this.showModal('Запись добавлена, теперь вы можете ее отредактировать');
            this.router.navigate([user.guid]);
          }),
        ).toPromise();
    this.resetForm(currentUser);
  }

  private showModal(text: string) {
    this.modal.info({
      nzContent: text
    });
  }

  private resetForm(user: User) {
    this.userFg.reset({
      first: user.name.first,
      last: user.name.last,
      age: user.age,
      email: user.email,
      guid: user.guid
    });
  }

  private fillUserModel(): User {
    const formValue = this.userFg.getRawValue();
    const {age, email, first, last, guid} = formValue;
    return {
      name: {first, last},
      email,
      guid,
      age
    } as User;
  }
}
