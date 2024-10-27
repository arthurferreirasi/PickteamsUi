import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { delay } from 'rxjs';

@Component({
  selector: 'app-pick-teams',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatInputModule
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
