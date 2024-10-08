using System.Net;

namespace plodo.Backend.API.Validation;

public class SessionNotFoundException : PlodoExceptionBase
{
    public SessionNotFoundException(string message, Exception innerException = null) 
        : base(HttpStatusCode.NotFound, "Session could not be found.", message, innerException)
    {
    }
}
    
public class NotAuthorizedForSessionException : PlodoExceptionBase
{
    public NotAuthorizedForSessionException(string message, Exception innerException = null) 
        : base(HttpStatusCode.Unauthorized, "You do not have permission for this session.", message, innerException)
    {
    }
}
    
public class NotFoundException : PlodoExceptionBase
{
    public NotFoundException(string message, Exception innerException = null) 
        : base(HttpStatusCode.NotFound, "The requested resource was not found.", message, innerException)
    {
    }
}