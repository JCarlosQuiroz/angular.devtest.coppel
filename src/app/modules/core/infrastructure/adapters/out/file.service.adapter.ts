import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable                         } from "@angular/core";
import { environment                        } from "src/environments/environment";
import { FileResponse                       } from "../../../domain/models/response/FileResponse";
import { FileService                        } from "../../../domain/ports/out/file.service";
import { Observable                         } from 'rxjs';

@Injectable({providedIn:"root"})
export class FileServiceAdapter implements FileService {
    url: string = environment.api;

    /**
     *
     * @param http
     */
        constructor(
        private http: HttpClient
    ) {}

    /**
     *
     * @returns
     */
    async getFile(): Promise<FileResponse> {
        let fileList : FileResponse;
        fileList = await this.http.get<FileResponse>(`${this.url}/files?rutaFinal=`)
            .toPromise()
            .catch( err => err);
        return fileList;
    }

    // async saveFile( file : File ): Promise<FileResponse> {
    //     return await this.http
    //         .post<FileResponse>(`${this.url}/files/upload?rutaFinal=`, file)
    //         .toPromise()
    //         .catch( err => err );
    // }


      //Metodo que envia los archivos al endpoint /upload
    upload(file: File): Observable<HttpEvent<any>>{
        const formData: FormData = new FormData();
        formData.append('files', file);

        const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
        reportProgress: true,
        responseType: 'json'
        });
        return this.http.request(req);
    }

    //Metodo para Obtener los archivos
    getFiles(){
        return this.http.get(`${this.url}/files?rutaFinal=`);
    }

    //Metodo para borrar los archivos
    deleteFile(filename: string){
        return this.http.get(`${this.url}/delete/${filename}?rutaFinal=`);
    }

    // uploadFile(file: File): Observable<HttpEvent<any>>{
    //     const formData: FormData = new FormData();
    //     formData.append('files', file);

    //     const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
    //     reportProgress: true,
    //     responseType: 'json'
    //     });
    //     return this.http.request(req);
    // }


}
