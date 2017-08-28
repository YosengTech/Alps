
//module Alps.Web.Models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    import{AlpsSelectorItemDto} from './AlpsSelectorItem';
    
    export class PurchaseOrderListDto {
        
        // CREATETIME
        public createTime: Date = null;
        // CREATER
        public creater: string = null;
        // CONFIRMTIME
        public confirmTime: Date = null;
        // CONFIRMER
        public confirmer: string = null;
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // ORDERID
        public orderID: string = "00000000-0000-0000-0000-000000000000";
        // SUPPLIER
        public supplier: string = null;
        // TOTALQUANTITY
        public totalQuantity: number = 0;
        // STATE
        public state: number = 0;
    }
    export class PurchaseOrderItemForEditDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // SKUID
        public skuid: string = "00000000-0000-0000-0000-000000000000";
        // QUANTITY
        public quantity: number = 0;
        // PRICE
        public price: number = 0;
        // AMOUNT
        public amount: number = 0;
    }
    export class PurchaseOrderForEditDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // SUPPLIER
        public supplier: string = null;
        // DEPARTMENT
        public department: string = null;
        // SUPPLIERID
        public supplierID: string = "00000000-0000-0000-0000-000000000000";
        // DEPARTMENTID
        public departmentID: string = "00000000-0000-0000-0000-000000000000";
        // CREATER
        public creater: string = null;
        // CREATETIME
        public createTime: string = null;
        // ITEMS
        public items: PurchaseOrderItemForEditDto[] = [];
    }
    export class PurchaseOrderEditModel {
        
        // SUPPLIEROPTIONS
        public supplierOptions: AlpsSelectorItemDto[] = [];
        // ORDER
        public order: PurchaseOrderForEditDto = null;
    }
//}