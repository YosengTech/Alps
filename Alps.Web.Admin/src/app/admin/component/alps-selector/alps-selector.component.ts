import { Component, OnInit, Input, Output, EventEmitter, OnChanges, forwardRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlpsSelectItem } from './alps-select-item';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const ALPS_SELECTOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AlpsSelectorComponent),
    multi: true
};
@Component({
    selector: 'alps-selector',
    templateUrl: './alps-selector.component.html',
    styleUrls: ['./alps-selector.component.css'],
    providers: [ALPS_SELECTOR_CONTROL_VALUE_ACCESSOR]
})
export class AlpsSelectorComponent implements OnInit, ControlValueAccessor {
    @ViewChild('selectorButton') selectorButton: ElementRef; 
    _value: string;
    displayValue: string;
    selectedDisplayValue: string;
    _options: AlpsSelectItem[];
    @Input()
    set options(newSource) {
        if (newSource)
            if (this._options !== newSource) {
                this._options = newSource;
                this.nodes.splice(0, this.nodes.length, new AlpsSelectorNode(this._options));
                this.initSelection();
            }
    }
    get options(): AlpsSelectItem[] { return this._options; }

    activedModal: NgbModalRef;
    constructor(private modal: NgbModal, private renderer: Renderer2) { }

    ngOnInit() {
    }
    open(content) {
        this.activedModal = this.modal.open(content, { size:'lg' });
        this.activedModal.result.then((result) => this.accept(result), (result) => this.reject(result));
    }

    accept(result: any) {

        this._value = this.nodes[this.nodes.length - 1].selectedItem.value;
        //this.value = result.value;
        this.displayValue = this.nodes[this.nodes.length - 1].selectedItem.displayValue;
        this.onChange(this._value);
    }

    reject(result: any) {

    }
    initSelection() {
        if (this._options && this._options.length > 0) {            
            if (this._value)
                if (this._value!=="" || this.nodes.length == 0 || !this.nodes[this.nodes.length - 1].selectedItem || this.nodes[this.nodes.length - 1].selectedItem.value !== this._value) {
                    this.nodes.splice(0, this.nodes.length);
                    if (!this.setSelection(this._options)) {
                        this.nodes.push(new AlpsSelectorNode(this._options));
                        this.selectedDisplayValue = "无法找到匹配项";
                    }
                    else
                        this.displayValue = this.nodes[this.nodes.length - 1].selectedItem.displayValue;
                }

        }
    }
    setSelection(items: AlpsSelectItem[]) {
        var finded = false;
        if (items) {
            for (let item of items) {
                if (item.value === this._value || this.setSelection(item.children)) {
                    this.nodes.splice(0, 0, new AlpsSelectorNode(items, item));
                    finded = true;
                    break;
                }
            }
            return finded;
        }

    }
    nodes: AlpsSelectorNode[] = [];
    addNode(node: AlpsSelectorNode, start?: number) {
        if (!start) {
            start = 0;
        }
        this.nodes.splice(start, this.nodes.length - start, node);

    }
    dblclick(item: AlpsSelectItem, index: number) {
        this.selectItem(item, index);
        if (this.nodes.length === index + 1)
            this.activedModal.close();

    }
    confirm() {
        if (!this.nodes[this.nodes.length - 1].selectedItem)
            alert("未选择具体选项");
        else
            this.activedModal.close();

    }
    selectItem(item: AlpsSelectItem, index: number) {
        if (item) {
            this.nodes[index].selectedItem = item;
            if (this.itemHasChild(item)) {
                this.addNode(new AlpsSelectorNode(item.children), index + 1);
                this.selectedDisplayValue = "";
            }
            else {
                this.nodes.splice(index + 1, this.nodes.length - index - 1);
                this.selectedDisplayValue = item.displayValue;
            }
        }

    }
    isParentNode(node: AlpsSelectorNode) {
        return (node.selectedItem && this.itemHasChild(node.selectedItem));
    }
    itemHasChild(item: AlpsSelectItem) {
        return (item.children && item.children.length > 0);
    }
    ///ControlValueAccessor Interface
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event
    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        if (this._value !== value) {
            this._value = value;
            this.initSelection();
        }
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean) {
        this.renderer.setProperty(this.selectorButton.nativeElement, 'disabled', isDisabled);
        // disable other components here
    }

}
export class AlpsSelectorNode {
    selectSource: AlpsSelectItem[];
    selectedItem: AlpsSelectItem;
    constructor(selectSource: AlpsSelectItem[], selectedItem?: AlpsSelectItem) {
        this.selectedItem = selectedItem;
        this.selectSource = selectSource;

    }

}


