using e_commerceProject.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace e_commerceProject.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        private readonly ILogger<ResponseCacheService> _logger;

        public ResponseCacheService(IConnectionMultiplexer redis, ILogger<ResponseCacheService> logger)
        {
            _database = redis.GetDatabase();
            _logger = logger;
        }

        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if(response == null)
            {
                _logger.LogWarning("Attempted to cache a null response for key: {CacheKey}", cacheKey);
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            var serialisedResponse = JsonSerializer.Serialize(response, options);

            var cacheResult = await _database.StringSetAsync(cacheKey, serialisedResponse, timeToLive);

            if (cacheResult)
            {
                _logger.LogInformation("Successfully cached response for key: {CacheKey} with TTL: {TimeToLive} seconds", cacheKey, timeToLive.TotalSeconds);
            }
            else
            {
                _logger.LogError("Failed to cache response for key: {CacheKey}", cacheKey);
            }
        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var cachedResponse = await _database.StringGetAsync(cacheKey);

            if(cachedResponse.IsNullOrEmpty)
            {
                _logger.LogInformation("No cache found for key: {CacheKey}", cacheKey);
                return null;
            }
            _logger.LogInformation("Cache hit for key: {CacheKey}", cacheKey);
            return cachedResponse;
        }
    }
}
