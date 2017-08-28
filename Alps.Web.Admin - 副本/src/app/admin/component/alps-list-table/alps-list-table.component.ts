import { Component, OnInit, Input, Output, SimpleChange, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'alps-list-table',
    templateUrl: './alps-list-table.component.html',
    styleUrls: ['./alps-list-table.component.css']
})
export class AlpsListTableComponent implements OnInit {
    @Input() source: any;
    @Input() settings: Object = {};

    hasID: boolean;
    constructor() {




    }
    ngOnInit() {
        if (!this.settings) {
            if (this.getSetting("columns")) {

            }

        }
        if (typeof this.source === 'array') {


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
