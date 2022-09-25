package com.wicker.ipldashboard.Data;


import java.time.LocalDate;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.wicker.ipldashboard.Model.Match;

@Component
public class MatchDataProcessor implements ItemProcessor<MatchInput, Match>{

    @Override
    public Match process(MatchInput matchInput) throws Exception {
        
        Match match = new Match();
        match.setId(Long.parseLong(matchInput.getId()));
        match.setCity(matchInput.getCity());
        match.setDate(LocalDate.parse(matchInput.getDate()));
        match.setPlayerOfMatch(matchInput.getPlayer_of_match());
        match.setVenue(matchInput.getVenue());
    
        //Set Team 1 & 2 Innings based
        if(matchInput.getToss_winner().equals(matchInput.getTeam1())){
            if("bat".equals(matchInput.getToss_decision())){
                match.setTeam1(matchInput.getTeam1());
                match.setTeam2(matchInput.getTeam2());
            }
            else{
                match.setTeam1(matchInput.getTeam2());
                match.setTeam2(matchInput.getTeam1()); 
            }            
        }
        else{
            if("bat".equals(matchInput.getToss_decision())){
                match.setTeam1(matchInput.getTeam2());
                match.setTeam2(matchInput.getTeam1());         
            }
            else{
                match.setTeam1(matchInput.getTeam1());
                match.setTeam2(matchInput.getTeam2());  
            } 
        }

        match.setTossWinner(matchInput.getToss_winner());
        match.setTossDecision(matchInput.getToss_decision());
        match.setMatchWinner(matchInput.getWinner());
        match.setResult(matchInput.getResult());
        match.setResultMargin(matchInput.getResult_margin());
        match.setUmpire1(matchInput.getUmpire1());
        match.setUmpire2(matchInput.getUmpire2());
        return match;
    }


    
}
