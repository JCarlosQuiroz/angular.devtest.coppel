import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SessionInteractor } from "../domain/ports/in/session.interactor";
import { SessionInteractorAdapter } from "../infrastructure/adapters/in/session.interactor.adapter";
import { HomeComponent } from "../infrastructure/components/home/home.component";
import { AuthGuard } from "../infrastructure/shared/services/auth.guard";


// const routes: Routes = [
//     { path: '', component: ActivitiesBranchComponent, canActivate: [AuthGuard]},
// ];

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];


export const UserComponents = [
  HomeComponent
];

/**
 */
@NgModule({
  providers: [
    {
      provide: SessionInteractor,
      useClass: SessionInteractorAdapter
    }
  ],
  // imports: [
  //     RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  // ],
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})

export class SessionModule { }
