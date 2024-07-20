import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendedComponent } from './class-attended.component';

describe('ClassAttendedComponent', () => {
  let component: ClassAttendedComponent;
  let fixture: ComponentFixture<ClassAttendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassAttendedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
