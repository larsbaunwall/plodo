using System.Net;

namespace plodo.Backend.API.Validation;

public class PlodoExceptionBase : Exception
{
    public HttpStatusCode StatusCode { get; }
    public string Title { get; }

    public PlodoExceptionBase(HttpStatusCode statusCode, string title, string message, Exception? innerException = null)
        : base(message, innerException)
    {
        StatusCode = statusCode;
        Title = title;
    }
}