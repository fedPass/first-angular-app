import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {
    //navigate gli passiamo un array e lui fa la join 
    //primo valore è la route e gli altri i valori che passo
    this.router.navigate(['search', form.value.search]);
  }

}
