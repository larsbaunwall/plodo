using System;

namespace plodo.Backend.API.Models
{
    public class GetAppVersionResponse
    {
        public string Version { get; set; }

        public Asset Windows { get; set; }
        public Asset MacOS { get; set; }
        
        public class Asset
        {
            public string Path { get; set; }
            public DateTimeOffset ReleaseDate { get; set; }
        }
        
    }
}