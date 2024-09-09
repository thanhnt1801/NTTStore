namespace e_commerceProject.DTOs
{
    public class OrderToReturnDTO
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public Models.OrderAggregate.Address ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDTO> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; } //map with GetTotal() in Order Class
        public string Status { get; set; }
    }
}
