import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { File } from "../../models/File";

/**
 */
export abstract class FileInteractor {

    abstract getFiles(): Promise<File[]>;

    // abstract saveFiles( File: File ): Promise<File>;
    // abstract saveFiles( File: File ): Observable<HttpEvent<any>>;
}