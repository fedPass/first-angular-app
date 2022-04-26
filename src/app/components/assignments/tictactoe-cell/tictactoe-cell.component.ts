import { Component, OnInit, Input } from '@angular/core';
import { CellStatus } from '../types';

@Component({
  selector: 'app-tictactoe-cell',
  templateUrl: './tictactoe-cell.component.html',
  styleUrls: ['./tictactoe-cell.component.scss']
})
export class TictactoeCellComponent implements OnInit {
  //prende in input dal padre lo status e con lo switch del template renderizza X / O / null
  @Input() status:CellStatus = null;
  constructor() { }

  ngOnInit(): void {
  }

}
