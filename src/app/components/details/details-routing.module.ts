import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DetailsComponent } from "./details.component";

const routes = [
    {
        //la path di quesa rotta sarà details/{id}
        path:':id',
        component: DetailsComponent
    }
];

@NgModule({
    imports: [
        //importa le ruote principale e gli collega come figlio le route di questo router
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DetailsRoutingModule {}

//farò imports di DetailsRoutingModule nel details.module