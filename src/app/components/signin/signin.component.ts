import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private User: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      ),
    ]),
  });
  loginUser() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.signIn(this.loginForm.value);
  }
  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }
}
