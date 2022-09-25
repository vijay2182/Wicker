import {Link} from 'react-router-dom';
import './MatchSmallCard.scss';

export const MatchSmallCard = ({teamName, match})=> {
    if(!match) return null;
    const opponentTeam = match.team1===teamName? match.team2: match.team1;
    const opponentTeamLink = `/teams/${opponentTeam}`;
    const isMatchWin = teamName===match.matchWinner;
    return(
        <div className = {isMatchWin ? 'MatchSmallCard won-card':'MatchSmallCard lost-card'}>
            <span className='vs'>vs </span>
            <h1><Link to={opponentTeamLink}>{opponentTeam}</Link></h1>
            <p className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
        </div>
    )
}