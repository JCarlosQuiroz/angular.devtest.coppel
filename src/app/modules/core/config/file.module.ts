import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FileInteractor } from "../domain/ports/in/file.interactor";
import { FileService } from "../domain/ports/out/file.service";
import { FileInteractorAdapter } from "../infrastructure/adapters/in/file.interactor.adapter";
import { FileServiceAdapter } from "../infrastructure/adapters/out/file.service.adapter";

/**
 */
@NgModule({
    providers: [
        {
            provide: FileService,
            useClass: FileServiceAdapter
        },
        {
            provide: FileInteractor,
            useClass: FileInteractorAdapter
        }
    ],
    imports: [
        // RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class FileModule { }