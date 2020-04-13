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
            return value is IEnumerable<string> list && list.All(x => Regex.IsMatch(x, @"^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]){1}$"));
        }
    }
    
    public class SingleVoteOptionValidator : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value is string str && Regex.IsMatch(str, @"^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]){1}$");
        }
    }
}