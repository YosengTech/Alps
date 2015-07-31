﻿using System;
using Alps.Domain.AccountingMgr;
using System.Collections.Generic;
using System.Collections.ObjectModel;
namespace Alps.Domain.PurchaseMgr
{
    public class PurchaseOrder:EntityBase
    {
        protected PurchaseOrder()
        {
            Items = new Collection<PurchaseOrderItem>();
        }
        public DateTime OrderTime { get; set; }
        public string Creater { get; set; }
        public Guid SupplyID { get; set; }
        public virtual TradeAccount Supply { get; set; }
        public virtual ICollection<PurchaseOrderItem> Items { get; set; }
        public PurchaseOrderState State { get; set; }
        public void Confirm()
        {
            if (State == PurchaseOrderState.Unconfirmed)
                State = PurchaseOrderState.Confirming;
        }

    }
}
