import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from '../../../services/instructor.service';
import { Instructor } from '../../../models/instructor.model';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit {
  instructorId: string = '';
  instructor: Instructor | undefined;

  constructor(private route: ActivatedRoute, private instructorService: InstructorService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log('Retrieved ID from route:', idParam); // Add this line for debugging
      if (idParam) {
        this.instructorId = idParam;
        this.getInstructorDetails(this.instructorId);
      }
    });
  }

  getInstructorDetails(id: string): void {
    this.instructorService.getInstructorById(id).subscribe({
      next: (instructor) => {
        this.instructor = instructor;
      },
      error: (error) => {
        console.error('Error fetching instructor details:', error);
      }
    });
  }
}
