import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() game:Game = {} as Game;
  @Output() selectedGame = new EventEmitter<Game>();

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    // console.log('game => ', this.game);
  }

  getGameTitle(game:Game) {
    this.selectedGame.emit(game);   
  }

  openGameDetails(id:string) {
    this.router.navigate(['details',id])
  }

}
