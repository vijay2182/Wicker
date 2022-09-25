import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './HomePage.scss';


export const HomePage = ()=>{

    const [teams, setTeams] = useState([]);

    useEffect(()=>{
        const fetchTeams = async ()=>{
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams`);
            const data = await response.json();
            setTeams(data);
        }

        fetchTeams();
    }, []);

    return(
        <div className='HomePage'>
            <div className='header-section'>
                <h1><i>WICKER IPL DASHBOARD</i></h1>
            </div>
            <div className='team-grid'>
                {teams.map((team)=> (
                <Link key = {team.id}  to={`/teams/${team.teamName}`}>
                <div className='name'><h2>{team.teamName}</h2></div>
                </Link>
                ))}
            </div>
            
        </div>
    )

}