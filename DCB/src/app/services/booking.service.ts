import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  userId: string;
  selectedDate: string;
  selectedTime: string;
  selectedInstructor: string;
  createdAt: Date;
  __v: number;
}

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings`, bookingData);
  }

  getAvailableInstructors(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/instructors/availability`, data);
  }

  getAllWheelerTypes () {
    return [{
      name : 'Two Wheeler',
      packages : [
        { value: '6days', label: '6 Days Package', duration: 6 , price : 4000 },
        { value: '15days', label: '15 Days Package', duration: 15, price : 6000 }
      ]
    },
    {
      name : 'Four Wheeler',
      packages : [
        { value: '10days', label: '10 Days Package', duration: 10, price : 9000 },
        { value: '20days', label: '20 Days Package', duration: 20, price : 12000 }
      ]
    }]
  }

  getAllWheelerTypes1 () {
    return this.http.get(`${this.baseUrl}/package`);
  }

  getPackageById(wheelerType : string, packageType : string){
    const wheeler  = this.getAllWheelerTypes().filter(_ => (
      _.name == wheelerType
    ))[0]
    console.log(wheeler);
    console.log(wheeler.packages.filter(_ => (
      _.value == packageType
    )));
    return wheeler.packages.filter(_ => (
      _.value == packageType
    ))[0]
  }

  getAllUnattendedBookings(userId : string){
    return this.http.get<Booking[]>(this.baseUrl+`/bookings?userId=${userId}`)
  }

  getAllAttendedBookings(userId : string){
    return this.http.get<Booking[]>(this.baseUrl+`/bookings?userId=${userId}&attended=true`)
  }

}
