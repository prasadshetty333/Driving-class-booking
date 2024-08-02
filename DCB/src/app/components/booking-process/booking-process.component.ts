import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';
import { UserService } from '../../services/user.service';

interface packageType {
  value : string;
  label : string;
  duration : number;
  price : number;
}

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.css']
})
export class BookingProcessComponent implements OnInit {
  formData = {
    phone: '',
    password: '',
  };

  constructor(
    private router: Router, 
    private http: HttpClient,
    private route: ActivatedRoute,
    private UserService:UserService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.userId = params['userId'];
    });
  }

  submitForm() {
    this.UserService.loginUser(this.formData.phone , this.formData.password).subscribe(
      (response: any) => {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('phone', this.formData.phone);
        this.router.navigate(['/user-dashboard/manage-booking', { phone : this.formData.phone }]  );
      },
      (error: any) => {
        console.error('Login failed:', error);
      }
    )
  }


  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  
}
