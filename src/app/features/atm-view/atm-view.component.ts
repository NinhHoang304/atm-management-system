import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATM } from '../../models/atm.model';

@Component({
  selector: 'app-atm-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atm-view.component.html',
  styleUrls: ['./atm-view.component.scss']
})
export class AtmViewComponent {
  @Input() atm!: ATM;
  @Output() close = new EventEmitter<void>();
}