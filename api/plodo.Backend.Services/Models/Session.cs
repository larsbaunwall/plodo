using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace plodo.Backend.Services.Models
{
    public class Session
    {
        public List<VoteOption> VotingOptions { get; set; }
        
        public class VoteOption
        {
            public string Name { get; }
            public string Icon { get; }

            public VoteOption(string name, string icon = null)
            {
                if(!Regex.IsMatch(name, @"^[a-zA-Z-]+$"))
                    throw new ArgumentException("name contains invalid characters", nameof(name));
                
                if(icon != null && !Regex.IsMatch(icon, @"^[a-zA-Z-]+$"))
                    throw new ArgumentException("icon contains invalid characters", nameof(name));

                Name = name;
                Icon = icon;
            }
        }
    }

}