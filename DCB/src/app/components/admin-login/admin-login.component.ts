import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  admin = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/admin/login', this.admin).subscribe(
      (response: any) => {
        localStorage.setItem('adminToken', response.token);
        this.router.navigate(['/admin-dashboard']);
      },
      (error: any) => {
        console.error('Login failed:', error);
      }
    );
  }
}
