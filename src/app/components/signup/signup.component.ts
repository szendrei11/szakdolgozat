import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}
  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {}
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['signin']);
      }
    });
  }
}
