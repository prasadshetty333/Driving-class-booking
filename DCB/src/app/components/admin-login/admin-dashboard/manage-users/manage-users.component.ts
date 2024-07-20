import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit{
  users: any[] = [];

  constructor(private adminService: AdminService) {}


  ngOnInit() {
    this.loadUsers();
  }


  loadUsers() {
    this.adminService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUsers(id: string) {
    if(confirm('Do you want to delete this User?')){
    this.adminService.deleteUsers(id).subscribe(() => {
      this.loadUsers();
    });}
  }

  
}
