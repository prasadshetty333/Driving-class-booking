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
  
 constructor(
  private UserService:UserService,
  private route: ActivatedRoute,
  ){

 }

 ngOnInit() {
  this.route.params.subscribe(params => {
    console.log(params['phone'] , 'phone');

    this.UserService.getUserByPhone(params['phone']).subscribe(res => {
      this.UserService.setUserDetails(res)
      console.log(res);
    })

    
  });
}

}
