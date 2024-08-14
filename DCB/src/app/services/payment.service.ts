import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserById(bookingId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?userId=${bookingId}`, );
  }

}
