import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../../services/instructor.service';
import { UserService } from '../../../services/user.service';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.css'
})
export class ManageBookingComponent {

  formData: FormGroup;
  times: string[] = ['09:00', '12:00', '15:00', '18:00'];
  instructors: any[] = [];
  allBookings: any[] = [];
  userDetails : any;

  constructor(private fb: FormBuilder, private InstructorService: InstructorService, private UserService: UserService, private BookingService: BookingService) {
    this.formData = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      instructor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.UserService.getUserByPhone(localStorage.getItem('phone')).subscribe(res => {
      this.userDetails = res
      this.UserService.setUserDetails(res)
      console.log(res);
      this.getAllBookings()
    })
  }

  getAllBookings() {
    this.BookingService.getAllUnattendedBookings(this.UserService.getUserDetails()._id).subscribe(res => {
      console.log(res);
      this.allBookings = res
      console.log(this.getMinimumDate());
    })
  }

  onSubmit(): void {
    if (this.formData.valid) {
      console.log(this.formData.value);
      this.BookingService.createBooking({
        userId: this.UserService.getUserDetails()._id,
        selectedDate: this.formData.value.date,
        selectedTime: this.formData.value.time,
        selectedInstructor: this.formData.value.instructor
      }).subscribe(res => {
        console.log(res);
        this.getAllBookings();
        this.formData.reset();
      },
      error => {
        alert(error.error.message);
        this.formData.reset();
      })
    } else {
      console.log('Form is invalid');
    }
  }

  async handleOnDateAndTimeChange() {
    this.InstructorService.getAvailableInstructors({
      wheelerType: this.UserService.getUserDetails().wheelerType,
      selectedDate: this.formData.value.date,
      selectedTime: this.formData.value.time
    }).subscribe(res => {
      this.instructors = res
    })
  }

  getMinimumDate(){
    if(this.isTodaysDateGreatedThanDate(this.userDetails.selectedStartDate)){
      return this.getFormattedDate()
    }else {
      return this.userDetails.selectedStartDate
    }
  }

  getFormattedDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isTodaysDateGreatedThanDate(dateString : string) {
    const today = new Date(this.getFormattedDate());
    const dateToCompare = new Date(dateString);
  
    return  today > dateToCompare;
  }

  checkExpired(){
    return this.isTodaysDateGreatedThanDate(this.userDetails.selectedEndDate)
  }
  
}
