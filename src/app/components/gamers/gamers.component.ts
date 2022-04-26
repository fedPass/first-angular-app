import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Gamer } from 'src/app/interfaces/gamer';
import { GamerService } from 'src/app/services/gamer.service';
import { checkWhiteSpaceValidator } from 'src/app/validators/whiteSpaceValidator';

@Component({
  selector: 'app-gamers',
  templateUrl: './gamers.component.html',
  styleUrls: ['./gamers.component.scss']
})
export class GamersComponent implements OnInit {
  gamersList:Gamer[] = [];
  //osservable per salvare la response
  gamers$: Observable<Gamer[]>;
  //form group per reactive form
  gamerReactiveForm:FormGroup;
  gamerIdSelected?:string | null;
  gamerSelected?:Gamer;

  constructor( 
    private gamerService:GamerService,
    private formBuilder:FormBuilder
    ) { 
    //per ottenere i dati uso all$
    this.gamers$ = gamerService.all$;
    //inizializzo reactive form
    this.gamerReactiveForm = this.formBuilder.group(
      {
        //le key sono i formControlName del form
        //importiamo validator per usare metodi di validazione
        username: ['',[Validators.required, Validators.minLength(3), checkWhiteSpaceValidator()]],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required, Validators.minLength(5)]],
        id: ['']
      }
    )
   }

  ngOnInit(): void {
  }

  onSubmitTemplateForm(form:NgForm) {
    //per eseguire un observable dobbiamo fare la subscribe
    //dentro la subscribe entra al ricevimento della response (quindi esito positivo)
    this.gamerService.createGamer(form.value).subscribe(
      () => form.reset()
    );
  }

  //al submit del form chiamiamo un'altra func a cui posso passare parametri per fare controlli
  onSubmitReactiveForm(){
    this.saveGamer(this.gamerReactiveForm.value, this.gamerReactiveForm);
  }
  //invece di fare subito chiamata al submit del form, uso funzione che prende params in ingresso
  //e verifica se ho id (fai update) o meno (fai create)
  saveGamer(postData: Gamer, form: NgForm | FormGroup){
    if (postData.id) {
      console.log('farò update, ho gamer id:', postData.id);
      this.gamerService.updateGamer(postData).subscribe(
        () => this.gamerReactiveForm.reset()
      );
    } else {
      console.log('non ho id, farò la create!');
      this.gamerService.createGamer(postData).subscribe(
        () => this.gamerReactiveForm.reset()
      );
    }
    this.gamerIdSelected = null;
  }

  deleteGamer(id?:string) {
    console.log('voglio cancellarti');
    if (id) {
      this.gamerService.deleteGamer(id).subscribe(
        () => this.gamerReactiveForm.reset()
      );
    }
  }

  onGamerClick(gamer:Gamer) {
    //1. prendo id del gamer
    this.gamerIdSelected = gamer.id;
    this.gamerSelected = gamer;
    console.log('gamer selected',this.gamerSelected);
    //2. inizializzare il form con i dati
    //setValue per passare tutto l'oggetto
    //patchValue per aggiornare anche un solo valore
    this.gamerReactiveForm.setValue(gamer);
  }

}
