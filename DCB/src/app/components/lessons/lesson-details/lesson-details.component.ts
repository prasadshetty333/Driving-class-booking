import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.css']
})
export class LessonDetailsComponent implements OnInit {
  lessonTitle: string = '';
  lessonPhoto: string = '';
  lessonDescription: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lessonTitle = params['title'];
      this.lessonPhoto = params['photo'];
      this.lessonDescription = params['description'];
    });
  }
}
