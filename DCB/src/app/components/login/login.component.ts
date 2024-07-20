import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login() {
    // Implement your login logic here
    console.log('Login clicked with email:', this.email, 'and password:', this.password);
  }
}
