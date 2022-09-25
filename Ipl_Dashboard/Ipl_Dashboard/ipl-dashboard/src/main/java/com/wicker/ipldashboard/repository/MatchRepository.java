package com.wicker.ipldashboard.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.wicker.ipldashboard.Model.Match;

public interface MatchRepository extends CrudRepository<Match, Long>{

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);
  
    List<Match> getMatchesByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
        String team1,
        LocalDate start1,
        LocalDate end1,
        String team2,
        LocalDate start2,
        LocalDate end2
    );

    default List<Match> findLatestMatchesbyTeam(String teamName, int count){
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0,count));
    }

    default List<Match> findMatchesOfTeamByYear(String teamName, LocalDate startDate, LocalDate endDate){
        return getMatchesByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
            teamName,
            startDate,
            endDate,
            teamName,
            startDate,
            endDate
        );
    }
    
}
