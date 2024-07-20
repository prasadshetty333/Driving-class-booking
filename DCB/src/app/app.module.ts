import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { PackagesComponent } from './components/packages/packages.component';
import { LocationComponent } from './components/location/location.component';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { InstructorDetailsComponent } from './components/instructors/instructor-details/instructor-details.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AppRoutingModule } from './app-routing.module';

import { BookingProcessComponent } from './components/booking-process/booking-process.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-login/admin-dashboard/admin-dashboard.component';
import { ManageInstructorsComponent } from './components/admin-login/admin-dashboard/manage-instructors/manage-instructors.component';
import { ManageUsersComponent } from './components/admin-login/admin-dashboard/manage-users/manage-users.component';
import { ManageBookingsComponent } from './components/admin-login/admin-dashboard/manage-bookings/manage-bookings.component';
import { ManagePaymentsComponent } from './components/admin-login/admin-dashboard/manage-payments/manage-payments.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ManageBookingComponent } from './components/user-dashboard/manage-booking/manage-booking.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/booking-process/forgot-password/forgot-password.component';
import { ClassAttendedComponent } from './components/user-dashboard/class-attended/class-attended.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'location', component: LocationComponent },
 
  
  
  { path: 'payment', component: PaymentComponent },
  
  { path: 'register', component: UserRegistrationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InstructorsComponent,
    PaymentComponent,
    LessonsComponent,
    PackagesComponent,
    LocationComponent,
    
  
    InstructorDetailsComponent,
    UserRegistrationComponent,
    BookingProcessComponent,
        AdminLoginComponent,
        AdminDashboardComponent,
        ManageInstructorsComponent,
        ManageUsersComponent,
        ManageBookingsComponent,
        ManagePaymentsComponent,
        UserDashboardComponent,
        ManageBookingComponent,
        ForgotPasswordComponent,
        ClassAttendedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule, 
    AppRoutingModule,
   
    RouterModule.forRoot(appRoutes),
    NgbModule ,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
