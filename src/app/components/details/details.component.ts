import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  //per poi chiamare all'onInit getDetails(id)
  gameId?: string;
  //variabile per salvare resp di game
  game$?:Observable<Game>;
  iconStars?:string[];

  private routeSub?: Subscription;

  constructor(
    //inietto router e game service
    private activatedRote:ActivatedRoute,
    private gameService:GamesService
  ) { }

  ngOnInit(): void {
    //con la subscribe resto in ascolto del param id
    this.routeSub = this.activatedRote.params.subscribe(params => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.game$ = this.gameService.getDetails(this.gameId);
      }
    })

  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // drawStarIcon() {
  //   if (Number.isInteger(this.game$?.rating)){
  //     for (let i=0; i < 5; i++) { 
  //       if (i < this.game$?.rating) { 
  //         this.iconStars?.push('<i class="bi bi-star-fill"></i>'); 
  //       } else { 
  //         this.iconStars?.push('<i class="bi bi-star"></i>');
  //       } 
  //     }
  //   }
  // }
}

