package com.wicker.ipldashboard.Model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Match {

    @Id
    private long id;
    private String city;
    private LocalDate date;    
    private String playerOfMatch; 
    private String venue ;
    private String team1;
    private String team2 ;
    private String tossWinner ;
    private String tossDecision ;
    private String matchWinner; 
    private String result ;
    private String resultMargin ;
    private String umpire1 ;
    private String umpire2;
    
}


