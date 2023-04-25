import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserInteractor } from "../domain/ports/in/user.interactor";
import { UserService } from "../domain/ports/out/user.service";
import { UserInteractorAdapter } from "../infrastructure/adapters/in/user.interactor.adapter";
import { UserServiceAdapter } from "../infrastructure/adapters/out/user.service.adapter";
import { LoginComponent } from "../infrastructure/components/login/login.component";
import { AddRoleComponent } from "../infrastructure/components/user/add-user/add-role/add-role.component";
import { AddUserComponent } from "../infrastructure/components/user/add-user/add-user.component";
import { UserComponent } from "../infrastructure/components/user/user.component";
import { AuthGuard } from "../infrastructure/shared/services/auth.guard";
import { HomeComponent } from '../infrastructure/components/home/home.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'user/users'             , component: UserComponent    , canActivate: [AuthGuard] },
    { path: 'user/users/add'         , component: AddUserComponent , canActivate: [AuthGuard] },
    { path: 'user/users/add/:idUser' , component: AddUserComponent , canActivate: [AuthGuard] },
];

export const UserComponents = [
    LoginComponent,
    UserComponent,
    AddUserComponent,
    AddRoleComponent,
    HomeComponent
];

/**
 */
@NgModule({
    providers: [
        {
            provide: UserService,
            useClass: UserServiceAdapter
        },
        {
            provide: UserInteractor,
            useClass: UserInteractorAdapter
        }
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class UserModule {}