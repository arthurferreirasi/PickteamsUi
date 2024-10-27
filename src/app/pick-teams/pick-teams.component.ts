import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { delay } from 'rxjs';

@Component({
  selector: 'app-pick-teams',
  standalone: true,
  imports: [
    MatTabsModule
  ],
  templateUrl: './pick-teams.component.html',
  styleUrl: './pick-teams.component.css'
})
export class PickTeamsComponent {

  players: string = '';
  listPlayers!: string[];
  isInvalidPlayers!: boolean;
  isReady: boolean = false;
  dataSource!: any[];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isInvalidPlayers = true;
    this.dataSource = [];
  }

  canRun(): boolean {
    this.isInvalidPlayers = (typeof this.players.trim()=='undefined' || this.players.trim() == null || this.players.trim() == '');
    return this.isInvalidPlayers;
  }

  addPlayer() {
    if(this.canRun())
      return;
    this.isLoading = true;
    console.log("LOADING");
    delay(10000);
    this.isLoading = false;
    this.listPlayers = this.formatListPlayers(this.players);
    this.players = '';
    this.isReady = true;
  }

  private formatListPlayers(players: string): string[]{
    var listPlayers = players.split('\n');
    listPlayers = listPlayers.map(x => x.replace(/[^a-zA-Z\sáÁàÀâÂãÃéÉêÊíÍóÓôÔõÕúÚüÜ]/g, ''));
    listPlayers = listPlayers.filter(item => item.trim() !== "");
    return listPlayers;
  }
}
