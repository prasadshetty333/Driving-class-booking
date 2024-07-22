import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  @ViewChild('userDetails') userDetails!: ElementRef;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe((users: any[]) => {
      this.users = users.map(user => ({
        ...user,
        payments: [],  // Initialize payments array
        bookings: []   // Initialize bookings array
      }));
    });
  }

  toggleUserDetails(userId: string): void {
    if (this.selectedUser && this.selectedUser._id === userId) {
      this.selectedUser = null;
    } else {
      const user = this.users.find(u => u._id === userId);
      if (user) {
        this.selectedUser = user;
        if (!user.payments.length) {
          this.loadUserPayments(userId);
        }
        if (!user.bookings.length) {
          this.loadUserBookings(userId);
        }
        setTimeout(() => {
          this.scrollToUserDetails();
        }, 0);
      }
    }
  }

  loadUserPayments(userId: string): void {
    this.adminService.getUserPayments(userId).subscribe((payments: any[]) => {
      const user = this.users.find(u => u._id === userId);
      if (user) {
        user.payments = payments;
      }
    });
  }

  loadUserBookings(userId: string): void {
    this.adminService.getUserBookings(userId).subscribe((bookings: any[]) => {
      const user = this.users.find(u => u._id === userId);
      if (user) {
        user.bookings = bookings;
      }
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Do you want to delete this user?')) {
      this.adminService.deleteUsers(userId).subscribe(() => {
        this.users = this.users.filter(user => user._id !== userId);
        if (this.selectedUser && this.selectedUser._id === userId) {
          this.selectedUser = null;
        }
      });
    }
  }

  scrollToUserDetails(): void {
    if (this.userDetails) {
      this.userDetails.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
