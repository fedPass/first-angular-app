import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { GamersComponent } from './components/gamers/gamers.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'home', 
    component: HomeComponent 
  },
  {
    path:'search/:game-search', 
    component: HomeComponent 
  },
  {
    path:'details',
    //lazy loading: solo quando entri in questo path si carica questo modulo 
    loadChildren: () => import('./components/details/details.module').then(res => res.DetailsModule)
  },
  {
    path:'gamers', 
    component: GamersComponent 
  },
  {
    path:'assignments', 
    component: AssignmentsComponent 
  },
  {
    path:'', 
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  //wildcard: intercetta qualsiasi stringa diversa da quelle stabilite precedentemente
  { path: '**', 
    component: PageNotFoundComponent 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
