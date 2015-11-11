﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Common
{
    public class Quantity : ValueObject
    {
        public decimal Count { get; set; }
        public decimal Weight { get; set; }
        public Quantity(decimal count, decimal weight)
            : base()
        {
            Count = count;
            Weight = weight;
        }
        public static Quantity operator +(Quantity q1, Quantity q2)
        {
            q1.Add(q2.Count, q2.Weight);
            return q1;
        }
        public static Quantity operator -(Quantity q1, Quantity q2)
        {
            q1.Count -= q2.Count;
            q1.Weight -= q2.Weight;
            return q1;
        }
        public Quantity Add(decimal count, decimal weight)
        {
            this.Count += count;
            this.Weight += weight;
            return this;
        }
        public Quantity Subtract(decimal count, decimal weight)
        {
            Add(-count, -weight);
            return this;
        }
        public bool IsNegative()
        {
            return this.Count < 0 || this.Weight < 0;
        }
    }
}
