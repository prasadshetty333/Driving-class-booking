import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../models/instructor.model';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  instructors: Instructor[] = [];

  constructor(private router: Router, private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors(): void {
    this.instructorService.getInstructors()
      .subscribe({
        next: (instructors) => {
          this.instructors = instructors;
        },
        error: (error) => {
          console.error('Error fetching instructors:', error);
          // Handle error as needed, e.g., show an error message
        }
      });
  }

  viewProfile(instructor: Instructor): void {
    this.router.navigate(['/instructor-details', instructor._id]);
  }
  bookNow(instructorName: string): void {
    this.router.navigate(['/register'], { queryParams: { instructor: instructorName } });
  }
}
