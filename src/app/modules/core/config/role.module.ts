import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleInteractor } from "../domain/ports/in/role.interactor";
import { RoleService } from "../domain/ports/out/role.service";
import { RoleInteractorAdapter } from "../infrastructure/adapters/in/role.interactor.adapter";
import { RoleServiceAdapter } from "../infrastructure/adapters/out/role.service.adapter";
import { AddRoleComponent } from "../infrastructure/components/role/add-role.component";
import { RoleComponent } from "../infrastructure/components/role/role.component";
import { AuthGuard } from "../infrastructure/shared/services/auth.guard";

const routes: Routes = [
    { path: 'roles', component: RoleComponent, canActivate: [AuthGuard]},
    { path: 'roles/add', component: AddRoleComponent, canActivate: [AuthGuard]},
    { path: 'roles/add/:idRole', component: AddRoleComponent, canActivate: [AuthGuard]},
];

export const RoleComponents = [
    RoleComponent,
    AddRoleComponent
];

/**
 */
@NgModule({
    providers: [
        {
            provide: RoleService,
            useClass: RoleServiceAdapter
        },
        {
            provide: RoleInteractor,
            useClass: RoleInteractorAdapter
        }
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class RoleModule {}