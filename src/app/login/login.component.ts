import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {User} from '../models/User';
import {Constants} from '../constants';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private dataService: DataService,
              private authService: AuthService) {
  }

  username = '';
  password = '';
  errorMsg: string;
  loading = false;

  ngOnInit() {
    this.errorMsg = '';
  }

  login() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    if (!this.validateUserNamePassword()) {
      this.errorMsg = 'Username/password fields cannot be empty';
      this.loading = false;
      return;
    }
    this.dataService.login(this.username, this.password).subscribe(data => {
      this.loading = false;
      if (!data) {
        this.errorMsg = 'Username/password incorrect';
        return;
      }
      this.authService.isLoggedInObservable.next(true);
      this.authService.loggedInUser.next(data);
      this.saveUserToLocalStorage(data);
      this.router.navigate(['/home']);
    });
  }

  private validateUserNamePassword() {
    return this.username !== '' && this.password !== '';
  }

  private saveUserToLocalStorage(data: User) {
    // todo: inpractise we get user details from decoding token, so saving/retrieving user is not needed.
    localStorage.setItem(Constants.TOKEN, 'abcd');
    localStorage.setItem(Constants.USER, JSON.stringify(data));
    localStorage.setItem(Constants.ISADMIN, data.roles.indexOf('ADMIN') >= 0 ? 'true' : 'false');
  }
}
