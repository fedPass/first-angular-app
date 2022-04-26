import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../interfaces/apiResponse';
import { Game } from '../interfaces/game';

export const GAME_FOR_PAGE = 12;

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    //inietto http nel costruttore
    private http:HttpClient
  ) { }

  //utilizzo del service in modo "statico" prendo le info da qui
  // getGames():Game[] {
  //   return [
  //     {
  //       imgSrc: 'https://cdn.pixabay.com/photo/2022/03/16/02/03/sunflowers-7071449_960_720.jpg',
  //       imgAltText: 'lorem picture',
  //       title: 'Tom Raider',
  //       icons: ['bi bi-playstation','bi bi-xbox','bi bi-nintendo-switch'],
  //       date: '27 Mar 2020'
  //     },
  //     {
  //       imgSrc: 'https://cdn.pixabay.com/photo/2013/08/20/15/47/poppies-174276_960_720.jpg',
  //       imgAltText: 'lorem picture',
  //       title: 'Uncharted',
  //       icons: ['bi bi-playstation','bi bi-nintendo-switch'],
  //       date: '27 Mar 2020'
  //     },
  //     {
  //       imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
  //       imgAltText: 'lorem picture',
  //       title: 'Horizon',
  //       icons: ['bi bi-playstation','bi bi-xbox'],
  //       date: '27 Mar 2020'
  //     }
  //   ]
  // }
  //utilizzo corretto del service, faccio chiamare per elaborare dati
  
  getList(ordering:string, page:number, search?:string):Observable<APIResponse<Game>> {
    //setto i parametri
    let params = new HttpParams().set('ordering',ordering).set('page',page).set('page_size', GAME_FOR_PAGE);
    //se m viene passato anche search
    //http param è immutabile quindi devo fare un new se non uso il primo
    if (search) {
      params = new HttpParams().set('ordering',ordering).set('search',search).set('page',page).set('page_size', GAME_FOR_PAGE);
    }
    //faccio chiamata get che ritorna una response di type Game chiamando questo endpoint e passando parametri
    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`,{
      params
    });
  }

  //implemento metodo per prendere info di un gioco 
  getDetails(id:string):Observable<Game> {
    //metto la request di ogni chiamata in una variabile
    const gameInfoRequest = this.http.get(`${environment.BASE_URL}/games/${id}`);
    const gameScreenshotsRequest = this.http.get(`${environment.BASE_URL}/games/${id}/screenshots`);
    const gameTrailersRequest = this.http.get(`${environment.BASE_URL}/games/${id}/movies`);
    //uso forkJoin() per ottenere le response delle promise delle chiamate
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest
    })
    //uso la funzione pipe per trasformare la response in osservable di type Game
    .pipe(
      map((res:any) => {
        return {
          //aggiungo risultati all'oggetto con spread operator (oggtto game)
          ...res.gameInfoRequest,
          //li chiamo screenshots perchè nel type game l'ho dichiarato così
          screenshots: res.gameScreenshotsRequest?.results,
          trailers: res.gameTrailersRequest?.results
        }
      })
    )
  }
}
