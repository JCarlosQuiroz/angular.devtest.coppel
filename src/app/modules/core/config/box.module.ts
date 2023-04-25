import { CommonModule           } from "@angular/common";
import { NgModule               } from "@angular/core";
import { RouterModule           } from "@angular/router";
import { BoxInteractor          } from "../domain/ports/in/box.interactor";
import { BoxService             } from "../domain/ports/out/box.service";
import { BoxInteractorAdapter   } from "../infrastructure/adapters/in/box.interactor.adapter";
import { BoxServiceAdapter      } from "../infrastructure/adapters/out/box.service.adapter";


@NgModule({
    declarations: [],
    providers: [
        {
            provide: BoxService,
            useClass: BoxServiceAdapter
        }, {
            provide: BoxInteractor,
            useClass: BoxInteractorAdapter
        }
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        RouterModule
    ]
})
export class BoxModule { }
