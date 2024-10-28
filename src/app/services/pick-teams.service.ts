import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickTeamsService {
  private apiUrl = 'http://localhost:5178/api/PickTeams';

  constructor(private http: HttpClient) { }

  public pickTeams(listPlayers: Player[], playersPerTeam: number): Observable<any>{
      const url = `${this.apiUrl}?quantity=${playersPerTeam}`;
  
      return this.http.post<any>(url, listPlayers);
}

public pickTeamsWithSeedPlayers(listPlayers: Player[], playersPerTeam: number): Observable<any>{
  const url = `${this.apiUrl}?quantity=${playersPerTeam}`;

  return this.http.post<any>(url, listPlayers);
}
}
