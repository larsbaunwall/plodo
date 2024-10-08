using System;
using Cassandra.Mapping.Attributes;

namespace plodo.Backend.Repositories.Model;

[Table("session_votes")]
public class SessionVote
{
    [Column("id")]
    public Guid Id { get; set; }
        
    [Column("sessionId")]
    public string SessionId { get; set; }
        
    [Column("audienceId")]
    public Guid AudienceId { get; set; }
        
    [Column("vote")]
    public string Vote { get; set; }
}