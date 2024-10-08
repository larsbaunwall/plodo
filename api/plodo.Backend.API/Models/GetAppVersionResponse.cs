namespace plodo.Backend.API.Models;

public class GetAppVersionResponse
{
    /// <summary>
    /// The version requested
    /// </summary>
    public string Version { get; set; }

    /// <summary>
    /// Windows download details
    /// </summary>
    public Asset Windows { get; set; }
        
    /// <summary>
    /// MacOS download details
    /// </summary>
    public Asset MacOS { get; set; }
        
    public class Asset
    {
        public string Path { get; set; }
        public DateTimeOffset ReleaseDate { get; set; }
    }
        
}