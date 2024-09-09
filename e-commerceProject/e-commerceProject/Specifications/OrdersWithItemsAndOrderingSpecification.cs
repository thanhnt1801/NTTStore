using e_commerceProject.Models.OrderAggregate;
using System.Linq.Expressions;

namespace e_commerceProject.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification(string buyerEmail) : base(x => x.BuyerEmail == buyerEmail)
        {
            AddIncludes(o => o.DeliveryMethod);
            AddIncludes(o => o.OrderItems);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(int id, string buyerEmail) : base(
            o => o.Id == id && o.BuyerEmail == buyerEmail)
        {
            AddIncludes(o => o.DeliveryMethod);
            AddIncludes(o => o.OrderItems);
        }
    }
}
