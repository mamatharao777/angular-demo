import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {User} from './models/User';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  constructor() {
    this.isLoggedInObservable = new BehaviorSubject(this.isLoggedIn());
    this.loggedInUser = new BehaviorSubject<User>(this.getLoggedInUserDetails());
  }

  public isLoggedInObservable: BehaviorSubject<boolean>;
  public loggedInUser: BehaviorSubject<User>;

  isLoggedIn(): boolean {
    // todo: add expiry check too for actual token.
    return localStorage.getItem(Constants.TOKEN) !== null;
  }

  getLoggedInUserDetails(): User {
    const user = localStorage.getItem(Constants.USER);
    const usr: User = JSON.parse(user);
    return usr;
  }

  clearCreds() {
    localStorage.clear();
  }

  isAdmin(): boolean {
    if (this.isLoggedIn()) {
      if (localStorage.getItem(Constants.ISADMIN)) {
        return true;
      }
    }
    return false;
  }

}
