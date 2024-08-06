import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../app/services/registration.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';

interface packageType {
  value : string;
  label : string;
  duration : number;
  price : number;
}


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user = {
    name: '',
    phone: '',
    email: '',
    gender: '',
    dob: '',
    llrNumber:'',
    password: '',

    wheelerType: '',
    package: '',
    selectedDuration: 0,
    selectedStartDate: '',
    selectedEndDate: '',
  };

  packages : packageType[] = [];

  WheelerTypes : {
    name : string;
    packages : packageType[]
  }[] = this.bookingService.getAllWheelerTypes();
 
  showTimeSelection = false;

 

  constructor(private router: Router, private registrationService: RegistrationService,private http: HttpClient,private bookingService: BookingService) {}
  



  handleWheelTypeSelection() : void {
    const wheelerType = this.WheelerTypes.filter(_ => _.name === this.user.wheelerType)[0];
    this.packages = wheelerType.packages
  }

  handlePackageSelection() {
    const selectedPackage = this.packages.find(pkg => pkg.value === this.user.package);
    if (selectedPackage) {
      this.user.selectedDuration = selectedPackage.duration;
      this.showTimeSelection = false;
    }
  }


  isOldEnough(dob: string): boolean {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }

  updateEndDate(startDate: string) {
    console.log(startDate , 'startDate');
    const start = new Date(startDate);
    if (start && this.user.selectedDuration > 0) {
      const end = new Date(start);
      console.log(end , 'end');
      console.log(this.user.selectedDuration , 'selectedDuration');
      end.setDate(end.getDate() + this.user.selectedDuration - 1 + 10);
      console.log(end , 'end2');
      this.user.selectedEndDate = this.formatDate(end);
      this.showTimeSelection = true;
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  getTodayDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  onSubmit() {
    if (this.isOldEnough(this.user.dob)) {
      this.registrationService.registerUser(this.user).subscribe(
        (response: any) => {
          console.log('User registered successfully:', response);
          const userId = response._id; // Make sure the response includes the _id field
          this.router.navigate(['/payment', { userId }]);
        },
        (error: any) => {
          console.error('User registration failed:', error);
        }
      );
    } else {
      alert('You must be at least 18 years old to register.');
    }
  }

  

  navigateToLogin() {
    this.router.navigate(['/user-login']);
  }
  
}
