import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { MenuInteractor } from "../domain/ports/in/menu.interactor";
import { MenuService } from "../domain/ports/out/menu.service";
import { MenuInteractorAdapter } from "../infrastructure/adapters/in/menu.interactor.adapter";
import { MenuServiceAdapter } from "../infrastructure/adapters/out/menu.service.adapter";

import { MenuComponent } from "../infrastructure/components/menu/menu.component";
import { AddMenuComponent } from "../infrastructure/components/menu/add-menu.component";
import { AddActionMenuComponent } from '../infrastructure/components/menu/actionMenu/add-actionMenu.component';
import { AuthGuard } from "../infrastructure/shared/services/auth.guard";

/** 
 * @description Rutas para listar, agregar, editar y detalle de opciones de menú
 * @type Routes
*/

const routes: Routes = [
  { path: 'core/menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'core/menu/:idMenu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'core/menu/add/detail', component: AddMenuComponent, canActivate: [AuthGuard]},
  { path: 'core/menu/add/detail/:idMenu', component: AddMenuComponent, canActivate: [AuthGuard] },
]

/** 
 * @description Exporta arreglo de componentes
 * @return Array<any>
*/

export const MenuComponents = [
  MenuComponent,
  AddMenuComponent,
  AddActionMenuComponent
];

/**
 * @description Importa y exporta rutas
 * Agrega proveedor MenuService y MenuInteractor 
 */
@NgModule({
  providers: [
    {
      provide: MenuService,
      useClass: MenuServiceAdapter
    }, {
      provide: MenuInteractor,
      useClass: MenuInteractorAdapter
    }
  ],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [
    RouterModule, 
  ]
})
export class MenuModule { }
