import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';



@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentTeam: string = '';
  token = localStorage.getItem('token');
  APIURL = "https://localhost:5001/Teams/";

  constructor(private http: HttpClient) { }

  // Create a new team for a user
  CreateTeam(teamName: string): Promise<boolean> {
    // Send a team name and expect a boolean depending on the success of the http
    return this.http.post<boolean>(this.APIURL + "addteam", {
      "token": this.token,
      "teamName": teamName
    }).toPromise();
  }

  // Gets all teams for a user
  GetAllTeams(): Promise<Team[]> {
    return this.http.get<Team[]>(this.APIURL + "getteams/" + this.token).toPromise();
  }

  DeleteTeam(teamName: string) {
    this.http.put(this.APIURL + "deleteteam", {
      "token": this.token,
      "teamName": teamName
    });
  }

  // Takes in a team and toggles its favourites value on the backend
  ToggleFavourite(team: Team) {
    this.http.put(this.APIURL + "deleteteam", {
      "token": this.token,
      "teamName": team.teamName,
      "isFav": team.isFav
    });
  }
}
