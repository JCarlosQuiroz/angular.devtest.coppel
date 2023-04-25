import { Injectable } from "@angular/core";
import { FileResponse } from "../../../domain/models/response/FileResponse";
import { FileInteractor } from "../../../domain/ports/in/file.interactor";
import { UserInteractor } from "../../../domain/ports/in/user.interactor";
import { FileService } from "../../../domain/ports/out/file.service";
import { MessageService } from "../../../domain/ports/out/message.service";
import { File } from '../../../domain/models/File';
import { Location } from "@angular/common";

@Injectable({ providedIn: "root" })
export class FileInteractorAdapter implements FileInteractor {
    private title: string = 'Archivo';

    /**
 * 
 * @param menuService 
 * @param message 
 * @param location 
 */
    constructor(
        private fileService: FileService,
        private message: MessageService,
        private location: Location,
        private userInteractor: UserInteractor,
    ) { }

    async getFiles(): Promise<File[]> {
        let fileList: File[];
        let fileResponse: FileResponse;

        fileResponse = await this.fileService.getFile().finally().catch(res => res);

        if (fileResponse.statusText == "OK") {
            fileList = fileResponse.data;
        } else {
            this.message.dialog('warning', { title: this.title, message: fileResponse.message });
            return Promise.reject(fileResponse.message);
        }

        return fileList;
    }


    // async saveFiles( file: File ): Promise<File> {
    //     let fileResponse : FileResponse;
    //     fileResponse = await this.fileService.saveFile( file ).finally();
    //     if( fileResponse.statusText == "OK" ) {
    //         file = fileResponse.data[0];
    //         this.message.dialog( 'success', {title: this.title, message: fileResponse.message } ).then( res => {
    //             this.location.back();
    //         });  
    //     } else {
    //         this.message.dialog( 'warning', {title: this.title, message: fileResponse.message } );  
    //         return Promise.reject(fileResponse.message);
    //     }
    //     return file;
    // }


}