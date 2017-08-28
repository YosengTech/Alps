import {
    Component,
    Input,
    ElementRef,
    ViewChild,
    Renderer2,
    forwardRef,
    OnInit, HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AlpsInlineEditComponent),
    multi: true
};

@Component({
    selector: 'alps-inline-edit',
    templateUrl: './alps-inline-edit.component.html',
    styleUrls: ['./alps-inline-edit.component.css'],
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
})
export class AlpsInlineEditComponent implements ControlValueAccessor, OnInit {

    @ViewChild('inlineEditControl') inlineEditControl: ElementRef; // input DOM element
    @ViewChild('alpsInlineEdit') alpsInlineEdit: ElementRef;

    @Input() label: string = '';  // Label value for input element
    @Input() type: string = 'text'; // The type of input element
    @Input() required: boolean = false; // Is input requried?
    @Input() disabled: boolean = false; // Is input disabled?
    private _value: string = ''; // Private variable for input value
    private preValue: string = ''; // The value before clicking to edit
    private editing: boolean = false; // Is Component in edit mode?
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event

    // Control Value Accessors for ngModel
    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(private element: ElementRef, private _renderer: Renderer2) {
        
    }

    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        this._value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    // Do stuff when the input element loses focus
    onBlur($event: Event) {
        this.editing = false;
    }
    onEnter()
    {
        //console.info(this.alpsInlineEdit.nativeElement.parentNode);
        this.editing = false;
        
    }
    @HostListener('focus', ['$event.target'])
    // Start the editting process for the input element
    edit(value) {
        if (this.disabled) {
            return;
        }

        this.preValue = value;
        this.editing = true;
        // Focus on the input element just as the editing begins
        setTimeout(_ => {
            if (this.inlineEditControl) {
                this.inlineEditControl.nativeElement.focus();
                this.inlineEditControl.nativeElement.select();
            }
        });

    }
    ngOnInit() {
   
       (this.element.nativeElement as HTMLElement).setAttribute("tabindex", "-1");
    }
}

