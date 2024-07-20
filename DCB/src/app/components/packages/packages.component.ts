import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {
  constructor(private router: Router) {}

  bookNow(packageType: string): void {
    this.router.navigate(['/register', { type: packageType }]);
  }
}
