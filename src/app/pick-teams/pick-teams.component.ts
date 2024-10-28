import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { delay } from 'rxjs';
import { Player } from '../models/player';
import { PickTeamsService } from '../services/pick-teams.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pick-teams',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './pick-teams.component.html',
  styleUrl: './pick-teams.component.css'
})
export class PickTeamsComponent {

  players: string = '';
  playersPerTeam: number = 0;
  listPlayers!: Player[];
  isInvalidPlayers!: boolean;
  isReady: boolean = false;
  dataSource!: any[];
  isLoading: boolean = false;
  hasSeedPlayers: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: PickTeamsService) {
    this.form = this.fb.group({
      seuCampo: ['', [Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    this.isInvalidPlayers = true;
    this.dataSource = [];
    this.listPlayers = [];
  }

  onlyNumbers(event: KeyboardEvent): void {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
    }
}

  canRun(): boolean {
    this.isInvalidPlayers = (typeof this.players.trim() == 'undefined' || this.players.trim() == null || this.players.trim() == '');
    return this.isInvalidPlayers;
  }

  addPlayer(hasSeed: boolean) {
    this.hasSeedPlayers = hasSeed;
    if (this.canRun())
      return;
    this.isLoading = true;
    delay(10000);
    this.isLoading = false;
    this.formatListPlayers(this.players);
    console.log(this.listPlayers);
    this.svc.pickTeams(this.listPlayers, this.playersPerTeam).subscribe(result => {
      console.log(result);
    });
    this.players = '';
  }

  private formatListPlayers(players: string) {
    var list = players.split('\n');
    list = list.map(x => x.replace(/[^a-zA-Z\sáÁàÀâÂãÃéÉêÊíÍóÓôÔõÕúÚüÜ]/g, ''));
    list = list.filter(item => item.trim() !== "");
    list.forEach(x => this.listPlayers.push(new Player(x, false)));
  }
}
