import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  userList: Array<any>;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.findAllUsers();
  }

  ionViewWillEnter() {

  }

  findAllUsers() {
    this.adminService.findAllUsers().subscribe(data => {
      console.log(data)
      this.userList = data;
    })
  }


}
