
//module Alps.Web.Models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    import{AlpsSelectorItemDto} from './AlpsSelectorItem';
    
    export class StockInVoucherListDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // CREATETIME
        public createTime: Date = null;
        // CONFIRMTIME
        public confirmTime: Date = null;
        // SOURCE
        public source: string = null;
        // DEPARTMENT
        public department: string = null;
        // TOTALAUXILIARYQUANTITY
        public totalAuxiliaryQuantity: number = 0;
        // TOTALQUANTITY
        public totalQuantity: number = 0;
        // TOTALAMOUNT
        public totalAmount: number = 0;
        // CONFIRMER
        public confirmer: string = null;
        // STATUS
        public status: string = null;
    }
    export class StockInVoucherItemDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // PRODUCTSKUID
        public productSkuID: string = "00000000-0000-0000-0000-000000000000";
        // AUXILIARYQUANTITY
        public auxiliaryQuantity: number = 0;
        // QUANTITY
        public quantity: number = 0;
        // PRICE
        public price: number = 0;
        // POSITIONID
        public positionID: string = "00000000-0000-0000-0000-000000000000";
        // SERIALNUMBER
        public serialNumber: string = null;
    }
    export class StockInVoucherEditDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // SOURCEID
        public sourceID: string = "00000000-0000-0000-0000-000000000000";
        // DEPARTMENTID
        public departmentID: string = "00000000-0000-0000-0000-000000000000";
        // STATUS
        public status: number = 0;
        // ITEMS
        public items: StockInVoucherItemDto[] = [];
    }
//}