import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private baseUrl = 'http://localhost:3000/api';
  private userDetails= {
    _id : '',
    name: '',
    phone: '',
    email: '',
    gender: '',
    dob: '',
    password: '',

    wheelerType: '',
    package: '',
    selectedDuration: 0,
    selectedStartDate: '',
    selectedEndDate: '',
  };;

  constructor(private http: HttpClient) {}

  loginUser(phone: any , password : string): Observable<any> {
    return this.http.post(this.baseUrl + '/users/login', {
      phone, 
      password
    })
  }

  getUserByPhone(phone: any): Observable<any> {
    return this.http.get(this.baseUrl + '/users/getByPhone'+`?phone=${phone}`)
  }

  setUserDetails(details: any) {
    this.userDetails = details;
  }

  getUserDetails() {
    return this.userDetails;
  }


  sendOtp(phone: string): Observable<any> {
    return this.http.post('/api/send-otp', { phone });
  }

  resetPassword(phone: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post('/api/reset-password', { phone, otp, newPassword });
  }

}
