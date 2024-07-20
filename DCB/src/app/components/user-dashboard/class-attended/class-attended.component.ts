import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-class-attended',
  templateUrl: './class-attended.component.html',
  styleUrl: './class-attended.component.css'
})
export class ClassAttendedComponent {
  allBookings: any[] = [];
  userDetails : any;

  constructor(private BookingService:BookingService , private UserService:UserService){
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
    this.BookingService.getAllAttendedBookings(this.UserService.getUserDetails()._id).subscribe(res => {
      console.log(res);
      this.allBookings = res
      console.log(this.getMinimumDate());
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

}
