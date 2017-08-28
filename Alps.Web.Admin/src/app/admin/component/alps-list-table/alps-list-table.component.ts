import { Component, OnInit, Input, Output, SimpleChange, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { Observer, Observable } from "rxjs/Rx";

@Component({
    selector: 'alps-list-table',
    templateUrl: './alps-list-table.component.html',
    styleUrls: ['./alps-list-table.component.css']
})
export class AlpsListTableComponent implements OnInit {
    _source;
    @Input()
    set source(value) {
        if (value)

            if (Array.isArray(value)) {
                if (this._source !== value)
                    this._source = value;
            }
    }
    get source() {
        return this._source;
    }
    _setting: TableSetting;
    @Input()
    set settings(setting: TableSetting) {
    if(setting)
        if (this._setting !== setting) {
            this._setting = setting;
            if ((this._setting.headerActions && this._setting.headerActions.length > 0) ||
                (this._setting.rowActions && this._setting.rowActions.length))
                this.hasAction = true;
        }
    }
    get settings(): TableSetting {
        return this._setting;
    }

    private hasAction = false;
    //hasID: boolean;
    private observer: Observer<boolean>;
    constructor() {
        this._setting = new TableSetting("");
        
        this._source = [];
    }
    ngOnInit() {
        if (!this.settings) {
            if (this.getSetting("columns")) {

            }

        }
        if (typeof this.source === <string>'array') {


        }
        //alert(JSON.stringify(this.settings));
    }
    getSetting(name: string, defaultValue?: any) {
        let keys = name.split('.');
        // clone the object
        let level = this.settings;// deepExtend({}, object);

        keys.forEach((k) => {
            if (level && typeof level[k] !== 'undefined') {
                level = level[k];
            }
        });
        return typeof level === 'undefined' ? defaultValue : level;
    }    
}

export class TableSetting {
    columns: Column[];
    rowActions: Action[];
    headerActions: Action[];
    baseUrl: string;
    constructor(baseUrl: string) {
        this.columns = [];
        this.rowActions = [];
        this.headerActions = [];
        this.baseUrl = baseUrl;
        //this.actions = new ActionSetting();
        //this.actions.baseUrl = baseUrl;
    }
    addColumn(id: string, title: string,pipe?:string): TableSetting {
        this.columns.push(new Column(id, title,pipe));
        return this;
    }
    addRowAction(link: string, iclass?: string, aclass?: string, showFuncion?: (row: any) => boolean): TableSetting {
        if (!aclass || aclass==="")
            aclass = "alps-list-table-action-edit";

        this.rowActions.push(new Action(link, aclass, iclass,showFuncion));
        return this;
    }
    //addHeaderAction(click: () => void, iclass?: string, aclass?: string): TableSetting {


    //    return this;
    //}
    addHeaderLink(link: string, iclass?: string, aclass?: string): TableSetting {
        if(!aclass)
          aclass= "alps-list-table-action-add";
        this.headerActions.push(new Action(link, aclass, iclass));
        return this;
    }
    addDefaultAddAction(): TableSetting {
        return this.addHeaderLink( this.baseUrl + "/edit", "ion-plus");

    }
    addDefaultEditAction(): TableSetting {
        return this.addRowAction( this.baseUrl + "/edit/", "ion-edit");
    }
    addDefaultDeleteAction(): TableSetting {
         return this.addRowAction( this.baseUrl + "/edit/", "ion-trash-a");

    }
}
export class Column {
    id: string;
    title: string;
    pipe: string;
    constructor(id: string, title: string, pipe?: string) {
        this.id = id;
        this.title = title;
        if (!pipe)
            pipe = "";
        this.pipe = pipe;
    }
}
export class Action {
   // click: () => void;
    link: string;
    iclass: string;
    aclass: string;
    isShow: (row: any) => boolean;
    constructor(link: string, aclass?: string, iclass?: string, show?: (row: any) => boolean) {
        this.link = link;
        this.aclass = aclass;
        this.iclass = iclass;
        if (show)
            this.isShow = show;
        else
            this.isShow = function (row) { return true;};
    }
    //bindClick(click: () => void) {
    //    this.click = click;
    //}
}
export class ActionSetting {
    baseUrl: string;

}
