package com.wicker.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import com.wicker.ipldashboard.Model.Team;

public interface TeamRepository extends CrudRepository<Team, Long>{

    Team findByTeamName(String teamName);
    
}
