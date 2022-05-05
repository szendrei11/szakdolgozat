import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {} from './services/tmdb.service';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movie-app';
  search = '';
  constructor(public authService: AuthService) {}
  logout() {
    this.authService.doLogout();
  }
  profile() {
    return this.getDecodedAccessToken(this.authService.getToken()).userId;
  }
  getDecodedAccessToken(token: string | null): any {
    if (token != null) {
      try {
        return jwt_decode(token);
      } catch (Error) {
        return null;
      }
    }
  }
  name = new FormControl('');
}
