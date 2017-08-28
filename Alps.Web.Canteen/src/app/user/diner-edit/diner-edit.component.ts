import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanteenService } from '../../canteen/canteen.service';
@Component({
    selector: 'app-diner-edit',
    templateUrl: './diner-edit.component.html',
    styleUrls: ['./diner-edit.component.css']
})
export class DinerEditComponent implements OnInit {

    constructor(private _canteenService: CanteenService, private _activatedRoute: ActivatedRoute, private _route: Router) { }
    diner: any = { name: "", cardNumber: "", idNumber:""};
    cardNumberEnabled = false;
    ngOnInit() {
        var id = this._activatedRoute.snapshot.params["id"];
        if (id)
            this._canteenService.getDiner(id).subscribe(d => {
                this.diner = d;
                if (this.diner.cardNumber)
                    this.cardNumberEnabled = true;
            });

    }
    back() {
        this._route.navigate(['/user/dinerlist']);
    }
    save() {
        if (this.diner.name == "" || this.diner.cardNumber.length != 10 || this.diner.idNumber.length != 18)
        {
            alert("输入的信息不正确");
            return;
        }
        this._canteenService.updateDiner(this.diner).subscribe(d => {
            if (d)
                this.back();
            else
                alert( "保存失败,请检查输入的信息");
        });


    }
}
