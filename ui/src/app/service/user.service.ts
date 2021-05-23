import { Injectable } from '@angular/core';
import {UserModel} from "../model/user.model";
import {Observable} from "rxjs";
import { v4 as uuidv4 } from 'uuid';

const USER_KEY = 'user.key';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * Saves user, generates a UUID
   * @param user the user to save
   * @return an observable containing uuid
   */
  saveUser(user: UserModel): Observable<string> {
    return new Observable<string>(sub => {
      const userToSave = {
        name: user.name,
        id: uuidv4()
      };
      localStorage.setItem(USER_KEY, JSON.stringify(userToSave))
      sub.next(userToSave.id);
      sub.complete();
    });
  }

  getUser(): Observable<UserModel> {
    return new Observable<UserModel>(sub => {
      const userString = localStorage.getItem(USER_KEY);
      let user = null;
      if(userString) {
        try {
           user = JSON.parse(userString);
        }
        catch(e) {
          console.error(e);
        }
      }
      sub.next(user);
      sub.complete();
    });
  }
}
