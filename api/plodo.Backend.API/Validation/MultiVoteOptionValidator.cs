using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace plodo.Backend.API.Validation;

public class MultiVoteOptionValidator : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        return value is IEnumerable<string> list && list.All(x => Regex.IsMatch(x, @"^[^\u0000-\u007F]+$"));
    }
}
    
public class SingleVoteOptionValidator : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        return value is string str && Regex.IsMatch(str, @"^[^\u0000-\u007F]+$");
    }
}