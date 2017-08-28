import { Component, OnInit } from '@angular/core';
import { BaMenuService } from '../theme';
import { Routes } from '@angular/router';
import { ADMIN_MENU } from './admin.menu';
@Component({
  selector: 'alps-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private _menuService: BaMenuService) { }

    ngOnInit() {
        this._menuService.updateMenuByRoutes(<Routes>ADMIN_MENU);
  }

}
