import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { PackagesComponent } from './components/packages/packages.component';
import { LocationComponent } from './components/location/location.component';


import { PaymentComponent } from './components/payment/payment.component';
import { InstructorDetailsComponent } from './components/instructors/instructor-details/instructor-details.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

import { BookingProcessComponent } from './components/booking-process/booking-process.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-login/admin-dashboard/admin-dashboard.component';
import { ManageInstructorsComponent } from './components/admin-login/admin-dashboard/manage-instructors/manage-instructors.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { ManageUsersComponent } from './components/admin-login/admin-dashboard/manage-users/manage-users.component';
import { ManageBookingsComponent } from './components/admin-login/admin-dashboard/manage-bookings/manage-bookings.component';
import { ManagePaymentsComponent } from './components/admin-login/admin-dashboard/manage-payments/manage-payments.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ManageBookingComponent } from './components/user-dashboard/manage-booking/manage-booking.component';
import { UserAuthGuard } from './services/user-auth.guard';
import { ForgotPasswordComponent } from './components/booking-process/forgot-password/forgot-password.component';
import { ClassAttendedComponent } from './components/user-dashboard/class-attended/class-attended.component';

const routes: Routes = [
  { path: 'instructors', component: InstructorsComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'location', component: LocationComponent },
 
  { path: 'payment', component: PaymentComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'instructor-details/:id', component: InstructorDetailsComponent },
  { path: 'admin-login', component: AdminLoginComponent },

  { path: 'user-dashboard', component: UserDashboardComponent , canActivate: [UserAuthGuard] , children: [
    { path: 'manage-booking', component: ManageBookingComponent },
    { path: 'class-attended', component: ClassAttendedComponent },
  ]},

  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard], children: [
      { path: 'instructors', component: ManageInstructorsComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'bookings', component: ManageBookingsComponent },
      { path: 'payments', component: ManagePaymentsComponent }
    ]
  },


  { path: 'user-login', component: BookingProcessComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
 
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
