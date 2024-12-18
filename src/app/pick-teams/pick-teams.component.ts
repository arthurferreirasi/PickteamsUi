import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Player } from '../models/player';
import { PickTeamsService } from '../services/pick-teams.service';
import { MatTableModule } from '@angular/material/table';
import { Team } from '../models/team';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { SelectSeedPlayersModalComponent } from '../select-seed-players-modal/select-seed-players-modal.component';

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
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule,
    SelectSeedPlayersModalComponent
  ],
  templateUrl: './pick-teams.component.html',
  styleUrl: './pick-teams.component.css'
})
export class PickTeamsComponent {
  dialog = inject(MatDialog);


  players: string = '';
  playersPerTeam: number = 0;
  listPlayers!: Player[];
  isInvalidPlayers!: boolean;
  isReady: boolean = false;
  dataSource: string = '';
  isLoading: boolean = false;
  hasSeedPlayers: boolean = false;
  form: FormGroup;
  displayedColumns: string[] = [];
  maxPlayers: number = 0;
  canSelectSeed: boolean = false;

  seedPlayers: string = '';
  seedPlayersPerTeam: number = 0;
  seedListPlayers!: Player[];
  seedDataSource: string = '';
  isInvalidSeedPlayers!: boolean;
  isReadySeed: boolean = false;

  constructor(private fb: FormBuilder, private svc: PickTeamsService) {
    this.form = this.fb.group({
      seuCampo: ['', [Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    this.isInvalidPlayers = true;
    this.isInvalidSeedPlayers = true;
    this.dataSource = '';
    this.seedDataSource = '';
    this.listPlayers = [];
    this.seedListPlayers = [];
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

  canRunSeed(): boolean {
    this.isInvalidSeedPlayers = (typeof this.seedPlayers.trim() == 'undefined' || this.seedPlayers.trim() == null || this.seedPlayers.trim() == '');
    return this.isInvalidSeedPlayers;
  }

  selectSeedPlayers() {
    if (this.canRunSeed())
      return;
    this.cleanData();
    this.isLoading = true;
    this.seedListPlayers = this.formatListPlayers(this.seedPlayers);
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectSeedPlayersModalComponent, {
      data: this.seedListPlayers,
    });

    dialogRef.afterClosed().subscribe((selectedList) => {
      if (selectedList) {
        this.svc.pickTeamsWithSeedPlayers(selectedList, this.seedPlayersPerTeam).subscribe(result => {
          this.seedDataSource = this.formatDataSource(result);
          this.isReadySeed = true;
        });
        this.seedPlayers = '';
        this.isLoading = false;
      }
    });
  }

  addPlayer() {
    if (this.canRun())
      return;
    this.cleanData();
    this.isLoading = true;
    this.listPlayers = this.formatListPlayers(this.players);
    this.svc.pickTeams(this.listPlayers, this.playersPerTeam).subscribe(result => {
      this.dataSource = this.formatDataSource(result);
      this.isReady = true;
    });
    this.players = '';
    this.isLoading = false;
  }

  private formatListPlayers(players: string): Player[] {
    var formattedList: Player[] = [];
    var list = players.split('\n');
    list = list.map(x => x.replace(/[^a-zA-Z\sáÁàÀâÂãÃéÉêÊíÍóÓôÔõÕúÚüÜ]/g, ''));
    list = list.filter(item => item.trim() !== "");
    list.forEach(x => formattedList.push(new Player(x, false)));
    return formattedList;
  }

  private formatDataSource(data: Team[]): string {
    return data.map(team => {
      const players = team.players.map(p => p.name.trim()).join('\n');
      return `${team.teamName}:\n${players}\n__________________`;
    }).join('\n\n');
  }

  copyToClipboard(data: string) {
    navigator.clipboard.writeText(data).then(() => {
      alert('Conteúdo copiado para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar para a área de transferência: ', err);
    });
  }

  cleanData() {
    this.listPlayers = [];
    this.displayedColumns = [];
  }
}
