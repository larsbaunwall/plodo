using System;
using System.Linq;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using plodo.Backend.API.Models;
using plodo.Backend.Services;
using plodo.Backend.Services.Models;

namespace plodo.Backend.API.Controllers
{
    [Route("api/v{version:apiVersion}/sessions")] 
    [ApiController]
    [ApiVersion("1")]
    public class SessionController : ControllerBase
    {
        private readonly ISecurityTokenService _sts;
        private readonly ISessionService _sessionService;
        private readonly IServerSentEventsService _serverSentEventsService;

        public SessionController(ISecurityTokenService sts, ISessionService sessionService, IServerSentEventsService serverSentEventsService)
        {
            _sts = sts;
            _sessionService = sessionService;
            _serverSentEventsService = serverSentEventsService;
        }

        /// <summary>
        /// Create a new feedback session
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<CreateSessionResponse>> Create(CreateSessionRequest request)
        {
            var options = request.VotingOptions.Select(x => new Session.VoteOption(x.ToLower()));
            
            var sessionId = _sessionService.CreateSession(new Session {VotingOptions = options.ToList()});
            var token = _sts.IssueToken(sessionId, Guid.Empty, new []{"Host"});

            return new CreateSessionResponse {SessionId = sessionId, AccessToken = new AccessToken(token)};
        }
        
        /// <summary>
        /// Close a feedback session
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(Roles = "Host")]
        [Route("{sessionId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Delete(string sessionId)
        {
            if (!HttpContext.User.HasClaim("session_id", sessionId))
                return Unauthorized();

            await _serverSentEventsService.SendEventAsync(sessionId, new ServerSentEvent {Type = "terminate"});
            _sessionService.DestroySession(sessionId);

            return Ok();
        }

        /// <summary>
        /// Add respondent to the session audience
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{sessionId}/audience")]
        public async Task<ActionResult<JoinSessionResponse>> Join(string sessionId)
        {
            var session = _sessionService.GetSession(sessionId);

            if (session == null)
                return BadRequest("Session not found");

            var votingOptions = session.VotingOptions.Select(x => x.Name);
            
            var token = _sts.IssueToken(sessionId, Guid.NewGuid(), new []{"Audience"});

            return new JoinSessionResponse{VotingOptions = votingOptions, AccessToken = new AccessToken(token)};
        }
        
        /// <summary>
        /// Cast a vote in the feedback session
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "Audience")]
        [Route("{sessionId}/votes")]
        public async Task<ActionResult> Vote(string sessionId, CastVoteRequest request)
        {
            if (HttpContext.User.HasClaim("session_id", sessionId))
                return Unauthorized("Audience not in the session specified");
            
            var session = _sessionService.GetSession(sessionId);

            if (session == null)
                return BadRequest("Session not found");

            await _serverSentEventsService.SendEventAsync(sessionId,
                new ServerSentEvent {Type = "vote", Data = new[] {request.Vote.ToString().ToLower()}});

            return Ok();
        }
    }
}