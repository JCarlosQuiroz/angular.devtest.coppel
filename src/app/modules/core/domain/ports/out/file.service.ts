import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { FileResponse } from "../../models/response/FileResponse";
// import { File } from '../../models/File';

export abstract class FileService {
    abstract getFile(): Promise<FileResponse>;

    // abstract saveFile( file: File ): Promise<FileResponse>;
    // abstract saveFile( file: File ): Observable<HttpEvent<any>>;
}