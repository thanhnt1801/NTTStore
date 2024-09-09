    using AutoMapper;
using e_commerceProject.DTOs;
using e_commerceProject.IRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace e_commerceProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketsController : ControllerBase
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketsController(IBasketRepository basketRepository, IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketId(string basketId)
        {
            var basket = await _basketRepository.GetBasketAsync(basketId);

            return Ok(basket ??  new CustomerBasket(basketId));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDTO customerBasketDto)
        {
            var customerBasket = _mapper.Map<CustomerBasketDTO, CustomerBasket>(customerBasketDto);
            var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasket(string basketId)
        {
            await _basketRepository.DeleteBasketAsync(basketId);
        }

    }
}
