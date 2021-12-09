import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  data;
  transactionList: Array<any>;
  

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.findAllTransactions();
  }

  ionViewWillEnter() {
  
  }

  findAllTransactions() {
     this.adminService.findAllTransactions().subscribe(res => {
      this.data=res;
      console.log(this.data);
    //  this.productList = data;
     });
  }
}
