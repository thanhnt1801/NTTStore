using AutoMapper;
using e_commerceProject.DTOs;
using e_commerceProject.Errors;
using e_commerceProject.Extensions;
using e_commerceProject.Interfaces;
using e_commerceProject.Models.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace e_commerceProject.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            var email = HttpContext.User?.RetrieveEmailFromPrincipal();

            var address = _mapper.Map<AddressDTO, Models.OrderAggregate.Address>(orderDTO.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDTO.DeliveryMethodId, orderDTO.BasketId, address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            return Ok(order);
        }

        [HttpGet("GetOrdersForUser")]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrdersForUser()
        {
            var email = HttpContext.User?.RetrieveEmailFromPrincipal();
            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDTO>>(orders));
        }

        [HttpGet("GetOrderByIdForUser/{id}")]
        public async Task<ActionResult<Order>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User?.RetrieveEmailFromPrincipal();
            var getOrder = await _orderService.GetOrderByIdAsync(id, email);

            if (getOrder == null) return BadRequest(new ApiResponse(404));

            return Ok(_mapper.Map<OrderToReturnDTO>(getOrder));
        }

        [HttpGet("GetDeliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }
    }
}
