using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Technic
{
    public class UserRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated
                ? new Guid(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                : Guid.Empty;
        }
    }
}