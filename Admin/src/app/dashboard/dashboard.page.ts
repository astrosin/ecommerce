import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userCount: any = "";
  productCount: any = "";
  transactionCount: any = "";

  constructor(
    private adminService: AdminService,private router:Router
  ) { }

  ngOnInit() {
    this.numberOfUsers();
    this.numberOfProducts();
    this.numberOfTransactions();
  }

  ionViewWillEnter() {

  }
  exit(){
    this.adminService.logout()
    this.router.navigate(['home'])
  }

  numberOfUsers() {
   this.adminService.numberOfUsers().subscribe(data => {
     console.log(data.length)
     this.userCount = data.length;
   });
  }

  numberOfProducts() {
   this.adminService.numberOfProducts().subscribe(data => {
     console.log(data.length)
       this.productCount = data.length;
    });
  }

  numberOfTransactions() {
    this.adminService.numberOfTransactions().subscribe(data => {
      console.log(data.length)
     this.transactionCount = data.length;
    });
  }

}
