using System;
using Cassandra.Mapping.Attributes;

namespace plodo.Backend.Repositories.Model;

[Table("session_audience")]
public class SessionAudience
{
    [PartitionKey]
    [Column("sessionId")]
    public string SessionId { get; set; }
        
    [ClusteringKey]
    [Column("audienceId")]
    public Guid AudienceId { get; set; }
}