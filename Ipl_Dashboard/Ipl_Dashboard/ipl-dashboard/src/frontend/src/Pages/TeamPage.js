import{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { MatchDetailCard } from "../Components/MatchDetailCard";
import { MatchSmallCard } from "../Components/MatchSmallCard";
import { PieChart } from 'react-minimal-pie-chart';
import './TeamPage.scss';

export const TeamPage = () =>{

    const [team, setTeam] = useState({matches:[]});

    const {teamName} = useParams();

    const opponentTeamLink = `/teams/${teamName}`;

    const year = process.env.REACT_APP_DATA_END_YEAR;


    useEffect(
        ()=>{
            const fetchMatches = async ()=>{
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };

            fetchMatches();
        }, [teamName]
    );

    if(!team.teamName || !team){
        return <h1>Team not found</h1>
    }

    return(
        <div className = 'TeamPage'>
            <div className='team-name-section'><h1 className='team-name'><Link to={opponentTeamLink}>{teamName}</Link></h1></div>
            <div className='win-loss-section'>
                Wins / Lossess
                <PieChart data={[
                    { title: 'Losses - ' +(team.totalMatches-team.totalWins), value: team.totalMatches-team.totalWins, color: '#8e4f5a' },
                    { title: 'Wins - '+team.totalWins, value: team.totalWins, color: '#4f8467' }                         
                ]}/>
            </div>
            <div className='match-detail-section'>
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>  
            {team.matches.slice(1).map((match)=> <MatchSmallCard key = {match.id} teamName={team.teamName} match = {match}/>)}
            <div className='more-link'>
                <Link to={`/teams/${teamName}/matches/${year}`}>More <span>&#8594;</span></Link>
            </div>
        </div>
    )
}