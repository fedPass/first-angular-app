//dichiaro che è un componente
import { Component, OnInit } from '@angular/core';
import { Player } from './types';
//decoratore che contiene i metadata
@Component({
  //selettore: come lo chiamo (sarà <app-prova></app-prova>)
  selector: 'app-assignments',
  //template: inserisco direttamente il codice (mi conviene usare ``)
  //template:`<h1>Sono il componente Assignment</h1>`,
  //templateUrl: inserisco la path della view che voglio collegare
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  //aggiungo proprietà che leggo con string interpolation 
  //e property binding nel template
  title = 'Assignments';
  allowPropertyBinding:boolean = false;
  btnClass = 'btn btn-secondary';
  btnText:string = 'Aspetta 5 secondi'; 
  isActive:boolean=false;
  inputText:string = '';
  resetBtnDisabled:boolean = true;
  inputList:string[] = [];
  showList:boolean = false;
  showOutput:boolean = true;
  initialPlayer:Player = 1 //esercizio tic-tac-toe
  constructor() {
    //attiva il btn dopo 5 sec dal rendenring del template
    setTimeout(()=>{
      this.allowPropertyBinding = true;
      this.btnClass = 'btn btn-success';
      this.btnText = 'Ora sono attivo';
    },5000);    
  }

  ngOnInit(): void {
    //posso variare il valore della proprietà prima che venga renderizzata
    this.title = 'Pagina Esercizi'
  }

  changeText():string{
    return this.title = 'Hai cliccato'
  }

  resetInput() {
    this.inputText= "";
  }

  addInputInList() {
    this.showList=true;
    this.showOutput=false;
    //console.log('ho cliccato add');
    //console.log(this.inputList);
    this.inputList.push(this.inputText);
    //console.log(this.inputList);
    this.inputText= "";
  }

}
