import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../../services/payment.service';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  userId: string | undefined;
  paymentData = {
    amount: 0,
    method: '',
  };
  userDetails : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private PaymnetService:PaymentService,
    private BookingService:BookingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log(params['userId'] , 'user   id');
      this.PaymnetService.getUserById(params['userId']).subscribe(res => {
        // this.userDetails = res;
        console.log(res);
        
        this.paymentData = {
          ...this.paymentData , 
          amount : this.BookingService.getPackageById(res.wheelerType , res.package).price
        }
      })
    });
  }

  submitPayment() {
    const paymentDetails = {
      ...this.paymentData,
      userId: this.userId
    };

    this.http.post('http://localhost:3000/api/payments', paymentDetails).subscribe(
      response => {
        console.log('Payment successful:', response);
        alert('payment successfull');
        this.router.navigate(['/user-login']);
      },
      error => {
        console.error('Payment failed:', error);
      }
    );
  }
}
