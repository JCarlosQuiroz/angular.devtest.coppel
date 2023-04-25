import { NgModule                   } from "@angular/core";
import { RouterModule, Routes       } from "@angular/router";
import { SuburbInteractor           } from "../domain/ports/in/suburb.interactor";
import { SuburbService              } from "../domain/ports/out/suburb.service";
import { SuburbInteractorAdapter    } from "../infrastructure/adapters/in/suburb.interactor.adapter";
import { SuburbServiceAdapter       } from "../infrastructure/adapters/out/suburb.service.adapter";

/**
 */
@NgModule({
    providers: [
        {
            provide : SuburbService,
            useClass: SuburbServiceAdapter
        },
        {
            provide : SuburbInteractor,
            useClass: SuburbInteractorAdapter
        }
    ],
    imports: [
        // RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class SuburbModule {}