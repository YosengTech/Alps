import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { isPresent } from './utils';

export enum AlpsLoadingBarEventType {
    PROGRESS,
    HEIGHT,
    COLOR,
    VISIBLE
}

export class AlpsLoadingBarEvent {
    constructor(public type: AlpsLoadingBarEventType, public value: any) { }
}

@Injectable()
export class AlpsLoadingBarService {

    private _progress: number = 0;
    private _height: string = '2px';
    private _color: string = 'firebrick';
    private _visible: boolean = true;

    private _intervalCounterId: any = 0;
    public interval: number = 500; // in milliseconds

    private eventSource: Subject<AlpsLoadingBarEvent> = new Subject<AlpsLoadingBarEvent>();
    public events: Observable<AlpsLoadingBarEvent> = this.eventSource.asObservable();

    constructor() { }

    set progress(value: number) {
        if (isPresent(value)) {
            if (value > 0) {
                this.visible = true;
            }
            this._progress = value;
            this.emitEvent(new AlpsLoadingBarEvent(AlpsLoadingBarEventType.PROGRESS, this._progress));
        }
    }

    get progress(): number {
        return this._progress;
    }


    set height(value: string) {
        if (isPresent(value)) {
            this._height = value;
            this.emitEvent(new AlpsLoadingBarEvent(AlpsLoadingBarEventType.HEIGHT, this._height));
        }
    }

    get height(): string {
        return this._height;
    }

    set color(value: string) {
        if (isPresent(value)) {
            this._color = value;
            this.emitEvent(new AlpsLoadingBarEvent(AlpsLoadingBarEventType.COLOR, this._color));
        }
    }

    get color(): string {
        return this._color;
    }

    set visible(value: boolean) {
        if (isPresent(value)) {
            this._visible = value;
            this.emitEvent(new AlpsLoadingBarEvent(AlpsLoadingBarEventType.VISIBLE, this._visible));
        }
    }

    get visible(): boolean {
        return this._visible;
    }

    private emitEvent(event: AlpsLoadingBarEvent) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    }

    requestCount: number = 0;
    start(onCompleted: Function = null) {
        //if (this._intervalCounterId)
            this.requestCount++;
        // Stop current timer
        this.stop();
        // Make it visible for sure
        this.visible = true;
        // Run the timer with milliseconds iterval
        this._intervalCounterId = setInterval(() => {
            // Increment the progress and update view component
           
            this.progress++;
            if (this.progress == 90)
                this.stop();
            // If the progress is 100% - call complete
            if (this.progress === 100) {
                this.complete();
            }
        }, this.interval);

    }

    stop() {
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
    }

    reset() {
        this.stop();
        this.progress = 0;
    }

    complete() {
        this.requestCount--;
        if (this.requestCount > 0) {
            return;
        }
        this.progress = 100;
        this.stop();
        setTimeout(() => {
            // Hide it away
            this.visible = false;
            setTimeout(() => {
                // Drop to 0
                this.progress = 0;
            }, 250);
        }, 250);
    }


}

