using Cassandra;
using Cassandra.Mapping;

namespace plodo.Backend.Repositories;

public class RepositoryBase
{
    protected ISession Session;
    protected readonly IMapper Mapper;

    public RepositoryBase(ISession session)
    {
        Session = session;
        Mapper = new Mapper(session);
    }
}