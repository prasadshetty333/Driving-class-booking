import { Component } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrl: './manage-payments.component.css'
})
export class ManagePaymentsComponent {

  payments: any[] = [];

  constructor(private adminService: AdminService) {}


  ngOnInit() {
    this.loadPayments();
  }


  loadPayments() {
    this.adminService.getPayments().subscribe(data => {
      this.payments = data;
    });
  }

  deletePayments(id: string) {
    if(confirm('Do you want to delete this instructor?')){
    this.adminService.deletePayments(id).subscribe(() => {
      this.loadPayments();
    });
  }
}


}
