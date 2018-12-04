using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Technic.Extensions
{
    public static class ControllerExtensions
    {
        public static Guid GetUserId(this Controller controller)
        {
            return new Guid(controller.User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
    }
}