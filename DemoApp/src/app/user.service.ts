import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, timer } from 'rxjs';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient) {}

  DEFAULT_EMAIL = 'example@gmail.com';

  searchUser(text: string) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          return this.http.get<any>(`${URL}/users?username=${text}`)
        })
      );
  }
}
