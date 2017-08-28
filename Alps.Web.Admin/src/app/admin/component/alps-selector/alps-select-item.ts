export class AlpsSelectItem {
    public value: string;
    public displayValue: string;
    public children: AlpsSelectItem[];
    constructor(value?: string, displayValue?: string) {
        this.value = value;
        this.displayValue = displayValue;
        this.children = [];
    }
    //addItem(item: AlpsSelectItem) {
    //    if (!this.children)
    //        this.children = [];
    //    this.children.push(item);
    //}
    //removeItem(item: AlpsSelectItem)
    //{
    //    var index = this.children.indexOf(item);
    //    if (index >-1)
    //        this.children.splice(index, 1);
    //}
    //hasChild(): boolean
    //{
    //    if (!this.children)
    //        this.children = [];
    //    return this.children.length > 0;
    //}
}
