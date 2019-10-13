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
    [Route("api/v1/sessions")] 
    [ApiController]
    public class SessionController : Controller
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
        public async Task<ActionResult> Create(CreateSessionRequest createSession)
        {
            var options = createSession.VotingOptions.Select(x => new Session.VoteOption {Name = x.ToString().ToLower()});
            
            var session = _sessionService.CreateSession(new Session {VotingOptions = options.ToList()});
            var token = _sts.IssueToken(session, Guid.Empty, new []{"Host"});

            return Ok(new CreateSessionResponse {SessionId = session, Token = new AccessToken(token)});
        }
        
        /// <summary>
        /// Close a feedback session
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(Roles = "Host")]
        [Route("{sessionId}")]
        public async Task<ActionResult> Delete(string sessionId)
        {
            var sessionIdClaim = HttpContext.User.FindFirst("session_id")?.Value ?? "";

            if (sessionIdClaim != sessionId)
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
        public async Task<ActionResult> Join(string sessionId)
        {
            var session = _sessionService.GetSession(sessionId);

            if (session == null)
                return BadRequest("Session not found");

            var votingOptions = session.VotingOptions.Select(x => Enum.Parse<Vote>(x.Name, true));
            
            var token = _sts.IssueToken(sessionId, Guid.NewGuid(), new []{"Audience"});

            return Ok(new JoinSessionResponse{VotingOptions = votingOptions, Token = new AccessToken(token)});
        }
        
//        /// <summary>
//        /// Remove respondent from the session audience
//        /// </summary>
//        /// <param name="sessionId"></param>
//        /// <param name="audienceId"></param>
//        /// <returns></returns>
//        [HttpDelete]
//        [Authorize(Roles= "Host, Audience")]
//        [Route("{sessionId}/audience/{audienceId}")]
//        public async Task<ActionResult> Join(string sessionId, Guid audienceId)
//        {
//            var sessionIdClaim = HttpContext.User.FindFirst("session_id")?.Value ?? "";
//            var audienceIdClaim = HttpContext.User.FindFirst("audience_id")?.Value ?? "";
//
//            if (sessionIdClaim != sessionId)
//                return Unauthorized();
//            
//            if (Guid.Parse(audienceIdClaim) != audienceId)
//                return Unauthorized();
//            
//            _serverSentEventsService.GetClients(sessionId).Where(x => x.)
//            
//            return StatusCode(StatusCodes.Status501NotImplemented);
//        }
        
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
            var sessionIdClaim = HttpContext.User.FindFirst("session_id")?.Value ?? "";

            if (sessionIdClaim != sessionId)
                return Unauthorized();
            
            var session = _sessionService.GetSession(sessionId);

            if (session == null)
                return BadRequest("Session not found");

            await _serverSentEventsService.SendEventAsync(
                new ServerSentEvent {Type = "vote", Data = new[] {request.Vote.ToString().ToLower()}});

            return Ok();
        }
    }
}