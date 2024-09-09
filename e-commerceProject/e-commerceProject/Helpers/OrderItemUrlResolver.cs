using AutoMapper;
using e_commerceProject.DTOs;

namespace e_commerceProject.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDTO, string>
    {
        private readonly IConfiguration _configuration;

        public OrderItemUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return _configuration["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }

            return null;
        }
    }
}
