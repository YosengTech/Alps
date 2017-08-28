import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[autofocus]'
})
export class AutofocusDirective {

    constructor(private _el: ElementRef, private _renderer: Renderer) { }

    @HostListener('keyup',['$event'])
    onKeyup(event) {
        if (event.keyCode == 13) {
            var focusIndex = -1;
            var controls = this._el.nativeElement.querySelectorAll('alps-inline-edit,input');
            for (let i = 0; i < controls.length;i++)
            {                
                if (event.path.indexOf(controls[i]) > -1) {
                    focusIndex = i== controls.length - 1 ? 0 : i + 1;
                    break;
                }
            }
            if (focusIndex > -1)
            {
                (controls[focusIndex] as HTMLElement).focus();
            } 
        }

    }
    

}
