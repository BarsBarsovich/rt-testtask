import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../services/users.service';

@Pipe({
  name: 'getUserInfo'
})
export class GetUserInfoPipe implements PipeTransform {

  transform(user: User, fullInfo: boolean = false): string {
    if (!user) {
      return;
    }

    return fullInfo ? `${user?.name?.first[0]}.${user?.name?.last[0]} - ${user.email}` : `${user?.name?.first[0]}.${user?.name?.last[0]}`;
  }

}
