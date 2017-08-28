import { Component, OnInit } from '@angular/core';
import { CanteenService } from "../../canteen/canteen.service";

@Component({
  selector: 'app-diner-list',
  templateUrl: './diner-list.component.html',
  styleUrls: ['./diner-list.component.css']
})
export class DinerListComponent implements OnInit {

    constructor(private _canteenService:CanteenService) { }
  diners: any[];
  ngOnInit() {
      this.diners = [];

      this._canteenService.getDiners().subscribe(data => this.diners = data);
  }

}
