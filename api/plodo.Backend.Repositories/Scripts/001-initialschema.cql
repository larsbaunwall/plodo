drop table if exists sessions;
drop table if exists session_audience;
drop table if exists session_votes;

CREATE TABLE sessions
(
    sessionId text PRIMARY KEY,
    hostId uuid,
    votingOptions list<text>
);

CREATE TABLE session_audience
(
    sessionId text,
    audienceId uuid,
    PRIMARY KEY(  sessionId, audienceId )
);

CREATE TABLE session_votes
(
    id uuid,
    sessionId text,
    audienceId uuid,
    vote text,
    PRIMARY KEY ( sessionId, id )
);