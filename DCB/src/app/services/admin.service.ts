// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // Instructors
  getInstructors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/admin/instructors');
  }

  addInstructor(instructor: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/admin/instructors', instructor);
  }

  updateInstructor(id: string, instructor: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/admin/instructors/${id}`, instructor);
  }

  deleteInstructor(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/admin/instructors/${id}`);
  }


  //users
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/admin/users');
  }

  deleteUsers(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/admin/users/${id}`);
  }

//bookings
  getBookings(): Observable<any> {
    return this.http.get('http://localhost:3000/api/admin/bookings');
  }

  deleteBookings(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/admin/bookings/${id}`);
  }

//payments
getPayments(): Observable<any> {
  return this.http.get('http://localhost:3000/api/admin/payments');
}

deletePayments(id: string): Observable<any> {
  return this.http.delete(`http://localhost:3000/api/admin/payments/${id}`);
}


handleMakeBookingAsAttended(bookingId : string){
  return this.http.put(`http://localhost:3000/api/admin/bookings/attend?bookingId=${bookingId}` , {})
}


}
