import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces/game';
import { GamesService, GAME_FOR_PAGE } from 'src/app/services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Home';
  selectedGameTitle: string = '';
  public games: Game[] = []; //response della chiamata
  //variabile d'appoggio per l'ordinamento selezionato (default metacrit - più popolari)
  private sort = 'metacrit';
  //variabile d'appoggio opzionale per il parametro di ricerca che prendo in url
  private search?: string;
  //variabili per assergli le subscription
  //da usare per fare unsubscribe nella OnDestroy
  private routeSub?: Subscription;
  private gameSub?: Subscription;
  //variabile d'appoggio per la pagina
  public currentPage = 1;
  //variabile per numero ultima pagina
  public lastPage:number = 1;
  

  constructor(
    public gameService: GamesService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //creo delle costanti in cui salvare gli observable delle subscribe (params)
    const routeParams = this.activedRoute.params;
    const routeQueryParams = this.activedRoute.queryParams;
    //combineLatest: scatta la subscribe anche per un solo evento
    this.routeSub = combineLatest([routeParams, routeQueryParams])
    //pipe: manipola observable
    .pipe(
      //nel map gli passo gli oggetti
      map( ([routeParams, routeQueryParams]) => {
        this.search = routeParams['game-search'];
        this.sort = routeQueryParams['sort'];
        //condizione per riportarlo a pagina 1 se inserisce pagina < 0
        //non posso gestire il caso in cui currentPage > lastPage perchè onInit non ho ancora chiamato searchGame
        this.currentPage = routeQueryParams['page'] > 0 ? routeQueryParams['page'] : 1;      
      })
    )
    //faccio la subscribe e chiam searchGame
    .subscribe( ()=> this.searchGames())

    //leggi i params della route attiva
    // this.routeSub = this.activedRoute.params.subscribe(params => {
    //   //lo chiamo così il param perchè così l'ho dichiarato in app-routing 
    //   this.search = params['game-search'];
    //   this.searchGames();
    // });

  }

  //implementiamo OnDestroy per fare le unsubsribe
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  showTitle(event: Game) {
    console.log('event => ', event);
    this.selectedGameTitle = event.name;
  }

  //funzione che uso nell'onInit per richiamare i dati
  searchGames() {
    //faccio la subscripe per restare in ascolto dell osservable
    this.gameSub = this.gameService.getList(this.sort, this.currentPage, this.search)
      .subscribe(gameList => {
        this.games = gameList.results;
        //mi devo ricavare il numero dell'ultima pagina
        //vedo il totale dei games --> gameList.count
        let gameCount = gameList.count; 
        // console.log('totale giochi: ',gameCount);
        // console.log('GAME_FOR_PAGE: ',GAME_FOR_PAGE);
        // lo divido per GAME_FOR_PAGE e lo sistemo per eccesso
        let totPagina = Math.ceil(gameCount/GAME_FOR_PAGE);
        // console.log('totPagine: ', totPagina);
        this.lastPage = totPagina;
      })
  }

  onSelectedChange(event: any) {
    //al click resta sulla stessa rotta, aggiungi i parametri e fai il merge dell'url
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: { sort: event.target.value },
      queryParamsHandling: 'merge'
    })
  }

  onPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.navigateToPage()
  }

  onNext() {
    this.currentPage++;
    this.navigateToPage()
  }


  navigateToPage() {
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    })
  }

}
