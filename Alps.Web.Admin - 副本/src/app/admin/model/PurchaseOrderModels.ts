

   export class PurchaseOrderListModel { 
        createTime: Date;
        creater: string;
        confirmTime: Date;
        confirmer: string;
        id: string;
        orderID: string;
        supplier: string;
        totalQuantity: number;
        constructor(){
          
        }
    }
   export class PurchaseOrderItemEditModel { 
        skuid: string;
        quantity: number;
        price: number;
        amount: number;
        constructor(){
          
        }
    }
   export class PurchaseOrderEditModel { 
        id: string;
        supplier: string;
        department: string;
        supplierID: string;
        departmentID: string;
        items: PurchaseOrderItemEditModel[];
        constructor(){
          this.items=[]
        }
    }
