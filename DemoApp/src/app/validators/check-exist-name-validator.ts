import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { UserService } from '../user.service';

export function CheckExistNameValidator(user: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return user.searchUser(control.value)
        .pipe(
          map(res => {
            if (res.length) {
              return { 'userNameExists': true};
            }
            else{
                return null;
            }
          })
        );
  }
}
