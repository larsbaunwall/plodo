using System;
using System.Collections.Generic;
using Cassandra.Mapping.Attributes;

namespace plodo.Backend.Repositories.Model
{
    [Table("sessions")]
    public class Session
    {
        [PartitionKey]
        [Column("sessionId")]
        public string Id { get; set; }
        
        [Column("hostId")]
        public Guid HostId { get; set; }
        
        [Column("votingOptions")] 
        public IEnumerable<string> VotingOptions { get; set; }
    }
}