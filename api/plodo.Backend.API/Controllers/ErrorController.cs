using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Controllers;

[ApiController]
[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult Error([FromServices] IWebHostEnvironment webHostEnvironment)
    {
        var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

        return context?.Error is PlodoExceptionBase ex
            ? Problem(
                title: ex.Title,
                instance: HttpContext.TraceIdentifier,
                detail: ex.Message,
                statusCode: (int)ex.StatusCode)
            : Problem(
                title: "An error occured on our side. Please try again.",
                instance: HttpContext.TraceIdentifier,
                detail: context?.Error?.Message,
                statusCode: (int)HttpStatusCode.InternalServerError );
    }
}