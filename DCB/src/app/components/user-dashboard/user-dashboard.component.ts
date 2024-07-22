import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  phone : string = '';
  userDetails1: any;
  
 constructor(
  private UserService:UserService,
  private route: ActivatedRoute,
  ){

 }

 ngOnInit() {
  this.route.params.subscribe(params => {
    

    this.UserService.getUserByPhone(params['phone']).subscribe(res => {
      this.UserService.setUserDetails(res)
      this.userDetails1 = this.UserService.getUserDetails();
      
    })

    
  });
}

}
