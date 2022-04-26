import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    //questo model userà questo router
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
