import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  formData = {
    phone: '',
    otp: '',
    newPassword: ''
  };
  otpSent = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  sendOtp() {
    this.userService.sendOtp(this.formData.phone).subscribe(
      (response: any) => {
        this.otpSent = true;
      },
      (error: any) => {
        console.error('OTP sending failed:', error);
      }
    );
  }

  resetPassword() {
    this.userService.resetPassword(this.formData.phone, this.formData.otp, this.formData.newPassword).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Password reset failed:', error);
      }
    );
  }
}
