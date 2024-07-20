import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'http://localhost:3000/api/instructors';

  constructor(private http: HttpClient) { }

  getAvailableInstructors(data: { wheelerType: string, selectedDate: string, selectedTime: string }): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/availability?wheelerType=${data.wheelerType}&selectedDate=${data.selectedDate}&selectedTime=${data.selectedTime}`);
  }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  getInstructorById(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }
}
