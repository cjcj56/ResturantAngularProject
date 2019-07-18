import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    const authObservable = this.isLoginMode ? this.authService.signin(email, password) : this.authService.signup(email, password);
    authObservable.subscribe(
      response => {
        this.router.navigate(['/recipes']);
      }, error => {
        this.errorMessage = error;
      }
    );

    this.isLoading = false;
    form.reset();
  }
}
