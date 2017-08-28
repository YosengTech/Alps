import { Component, OnInit } from '@angular/core';
import { CanteenService } from "../canteen.service";

@Component({
  selector: 'app-take-info',
  templateUrl: './take-info.component.html',
  styleUrls: ['./take-info.component.css']
})
export class TakeInfoComponent implements OnInit {

  constructor(private _canteenService:CanteenService) { }
  dinerName: string;
  cardNumber: string;
  searchResult: any[]=[];
  noResult: boolean = false;
  ngOnInit() {
  }
  search() {
      this.noResult = false;
      this._canteenService.gettakeinfo(this.cardNumber, this.dinerName).subscribe(d => {
      
          this.searchResult = <any[]>d;
         
          if (!this.searchResult.length || this.searchResult.length == 0)
          {
              this.noResult = true;
          }
      });
  }

}
