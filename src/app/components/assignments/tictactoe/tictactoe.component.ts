import { Component, Input, OnInit } from '@angular/core';
import { Board, Player } from '../types';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TictactoeComponent implements OnInit {
  //prendo in input dal padre (assignment) il giocatore iniziale 
  @Input() initialPlayer: Player = 1;
  //assegno questo valore al current Player
  currentPlayer:Player = 1;
  //dichiaro questa matriche che rappresenta il piano di gioco
  board:Board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]

  constructor() { }

  ngOnInit(): void { }

  onCellClick(x:number,y:number) {
    //stampo in console le coordinate della cella cliccata
    console.log('hai cliccato su X:', x +' - Y:'+ y);
    // il primo giocato è 1 quindi cliccando devo assegnare il valore alla matrice per vedere nel template
    this.board[x][y] = this.currentPlayer;
    //inverto i giocatori
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

}
