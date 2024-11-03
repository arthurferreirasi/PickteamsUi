import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Player } from '../models/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-seed-players-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './select-seed-players-modal.component.html',
  styleUrl: './select-seed-players-modal.component.css'
})
export class SelectSeedPlayersModalComponent {

  data: Player[] = inject(MAT_DIALOG_DATA);
}
