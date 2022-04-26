import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { GamersComponent } from './components/gamers/gamers.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { CardComponent } from './components/home/card/card.component';
import { TictactoeComponent } from './components/assignments/tictactoe/tictactoe.component';
import { TictactoeCellComponent } from './components/assignments/tictactoe-cell/tictactoe-cell.component';
import { GamesInterceptor } from './interceptors/games.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GamersComponent,
    AssignmentsComponent,
    PageNotFoundComponent,
    AlertComponent,
    CardComponent,
    TictactoeComponent,
    TictactoeCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      //useClass: nome interceptor che ho creato
      useClass: GamesInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
