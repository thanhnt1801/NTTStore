using e_commerceProject.Models.OrderAggregate;

namespace e_commerceProject.Interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId); 
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}
