import { Component } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
  bookings: any[] = [];
  
  constructor(private adminService: AdminService) {}


  ngOnInit() {
    this.loadBookings();
  }


  loadBookings() {
    this.adminService.getBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  deleteBookings(id: string) {
    if(confirm('Do you want to delete this Booking?')){
    this.adminService.deleteBookings(id).subscribe(() => {
      this.loadBookings();
    });
  }
  }

  makeBookingAsAttended(bookingId : string){
    this.adminService.handleMakeBookingAsAttended(bookingId).subscribe(res => {
      this.loadBookings()
    })
  }

}
