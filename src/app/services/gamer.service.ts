import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, shareReplay, skip, Subject, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gamer } from '../interfaces/gamer';

@Injectable({
  providedIn: 'root'
})
export class GamerService {
  //proprietà di tipo observ Game[]
  //che inizializziamo con le response della getGamers()
  all$: Observable<Gamer[]>;
  //type subject????
  private refresh$: Subject<boolean>;
  //observable per gamer selezionato
  selectedGamer$?: Observable<Gamer[]>;

  constructor(private http:HttpClient) { 
    //inizializzo a true così entra nella pipe e aggiorna i dati la prima volta
    this.refresh$ = new BehaviorSubject<boolean>(true);
    //ogni volta che ci sarà un refresh entra nel pipe fai la get a firebase, manipola i dati in arrivo mettendoli in arrayGame
    //this.all ha l'obiettivo di ottenere un osservable di array gamer
    this.all$ = this.refresh$.pipe(
      //in ingresso abbiamo un boolean ma restituiamo un tipo gamer
      //switchMap serve a dire che cambiamo il type che abbiamo ricevuto in ingresso e ritorna un observable
      switchMap(() => this.http.get<Record<string, Gamer>>(`${environment.FIREBASE_URL}/gamers.json`)),
      switchMap( resData => {
        const gamerArray:Gamer[] = [];
        //firebase ha una struttura strana tipo una proprietà id fuori dall'oggetto con le info
        //sto cambiando la response, popolo l'arrayGamer portando id dentro l'oggetto con i dati
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            gamerArray.push({id: key,...resData[key]})
          } 
        }
        //of() per ritornare un osservable
        return of(gamerArray)
      }),
      //tap prendo ciò che mi arriva dallo stream ha tre stati 
      //(next: valore ultimo evento emesso, error: scatta alla presenza di un errore, complete(all'unsubscribe): stream terminato)
      tap({
        next: result => console.log('all$', result),
        error: err => console.log('all$ err', err),
      }),
      //possono esserci più subscribe quindi chiunque è in ascolto 
      //prende l'ultimo valore dell'evento emesso usando shareReplay()
      //c'è un registro di evento (stream) e con 1 indico l'ultimo evento emesso
      shareReplay(1)
    )
  }

  refresh():Observable<Gamer[]> {
    //sto dando allo stream nuovo valore, essendo boolean passiamo true
    //entra sempre nel pipe e farà nuova richiesta dati
    this.refresh$.next(true);
    //farò return restando in ascolto su all
    return this.all$.pipe(
      skip(1),
      //con take 1 facciamo subito subscribe, prendi ultimo valore e interrompi
      take(1)
    )
  }

  createGamer(gamer:Gamer):Observable<Gamer[]> {
    return this.http
    //post prende come 1' par url, , 
    .post(`${environment.FIREBASE_URL}/gamers.json`,
    //come 2'par body
      gamer,
      //come 3'par eventuali info
      {
          //indico di ved ciò che c'è nell'oggetto response e non nella body
        observe: 'response'
      })
      .pipe(
        take(1),
        switchMap(()=> this.refresh())
      )

  } 

  updateGamer(gamer:Gamer):Observable<Gamer[]> {
    return this.http
    .put(`${environment.FIREBASE_URL}/gamers/${gamer.id}.json`,
    gamer,
    {observe:'response'}
    ).pipe(
      take(1),
      switchMap(()=> this.refresh())
    )
  }

  deleteGamer(gamerId:string):Observable<Gamer[]> {
    return this.http
    .delete(`${environment.FIREBASE_URL}/gamers/${gamerId}.json`)
    //pipe: fai cosi qui dentro
    .pipe(
      take(1),
      //chiamo la refresh 
      switchMap(() => this.refresh())
    )
  }

}
