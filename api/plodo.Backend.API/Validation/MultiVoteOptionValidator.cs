using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace plodo.Backend.API.Validation
{
    public class MultiVoteOptionValidator : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value is IEnumerable<string> list && list.All(x => Regex.IsMatch(x, @"^[a-zA-Z-]+$"));
        }
    }
    
    public class SingleVoteOptionValidator : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value is string str && Regex.IsMatch(str, @"^[a-zA-Z-]+$");
        }
    }
}