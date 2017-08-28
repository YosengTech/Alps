import { Component, Input, OnInit } from '@angular/core';

import { AlpsLoadingBarService, AlpsLoadingBarEvent, AlpsLoadingBarEventType } from './alps-loading-bar.service';
import { isPresent } from './utils';


@Component({
    selector: 'alps-loading-bar',
    templateUrl: './alps-loading-bar.component.html',
    styleUrls: ['./alps-loading-bar.component.css']
})
export class AlpsLoadingBarComponent implements OnInit {

    @Input() progress: string = '0';
    @Input() color: string = 'green';
    @Input() height: string = '8px';
    @Input() show: boolean = true;

    constructor(public service: AlpsLoadingBarService) { }

    ngOnInit(): any {
        this.service.events.subscribe((event: AlpsLoadingBarEvent) => {
            if (event.type === AlpsLoadingBarEventType.PROGRESS && isPresent(event.value)) {
                this.progress = event.value;
            } else if (event.type === AlpsLoadingBarEventType.COLOR) {
                this.color = event.value;
            } else if (event.type === AlpsLoadingBarEventType.HEIGHT) {
                this.height = event.value;
            } else if (event.type === AlpsLoadingBarEventType.VISIBLE) {
                this.show = event.value;
            }
        });
    }
}
