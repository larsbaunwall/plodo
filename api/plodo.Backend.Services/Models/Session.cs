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
                if(!Regex.IsMatch(name, @"^[^\u0000-\u007F]+$"))
                    throw new ArgumentException("name contains invalid characters", nameof(name));

                Name = name;
                Icon = icon;
            }
        }
    }

}