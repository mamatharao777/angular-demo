import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  isLoggedIn = false;
  user: User = <User> {};

  ngOnInit() {
    this.authService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
    });
    this.authService.loggedInUser.subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  logout() {
    this.authService.clearCreds();
    this.authService.loggedInUser.next(null);
    this.authService.isLoggedInObservable.next(false);
    this.router.navigate(['/login']);
  }

}
