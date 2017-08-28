
//module Alps.Web.Models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    import{AlpsSelectorItemDto} from './AlpsSelectorItem';
    
    export class CatagoryListDto {
        
        // NAME
        public name: string = null;
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
    }
    export class ProductListDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // NAME
        public name: string = null;
        // FULLNAME
        public fullName: string = null;
        // SHORTDESCRIPTION
        public shortDescription: string = null;
        // FULLDESCRIPTION
        public fullDescription: string = null;
        // DEPRECATED
        public deprecated: boolean = false;
        // ENABLEAUXILIARYQUANTITY
        public enableAuxiliaryQuantity: boolean = false;
    }
    export class ProductEditDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // NAME
        public name: string = null;
        // FULLNAME
        public fullName: string = null;
        // SHORTDESCRIPTION
        public shortDescription: string = null;
        // FULLDESCRIPTION
        public fullDescription: string = null;
        // DEPRECATED
        public deprecated: boolean = false;
        // ENABLEAUXILIARYQUANTITY
        public enableAuxiliaryQuantity: boolean = false;
    }
    export class ProductskuListDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // NAME
        public name: string = null;
        // PRODUCTNAME
        public productName: string = null;
        // DESCRIPTION
        public description: string = null;
        // AUXILIARYQUANTITY
        public auxiliaryQuantity: number = 0;
        // QUANTITY
        public quantity: number = 0;
        // PRICE
        public price: number = 0;
        // CREATEDTIME
        public createdTime: Date = new Date(0);
        // MODIFIEDTIME
        public modifiedTime: Date = new Date(0);
    }
    export class ProductskuEditDto {
        
        // ID
        public id: string = null;
        // NAME
        public name: string = null;
        // PRODUCTID
        public productID: string = "00000000-0000-0000-0000-000000000000";
        // DESCRIPTION
        public description: string = null;
        // AUXILIARYQUANTITY
        public auxiliaryQuantity: number = 0;
        // QUANTITY
        public quantity: number = 0;
        // PRICE
        public price: number = 0;
    }
//}