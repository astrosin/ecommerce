
import { Component, OnInit, Input } from '@angular/core';
import { NotificationsCard } from '../auth-service.service';
import { FunctionsService } from '../functions.service';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
})
export class OrderlistPage implements OnInit {

  @Input() data: Array<NotificationsCard>;

  constructor(private fun: FunctionsService) { }

  ngOnInit() {
  }

}
