import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {
    url: string = environment.api;

    constructor(private http: HttpClient) { }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('files', file);

        const req = new HttpRequest('POST', `${this.url}/files/upload?rutaFinal=`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    uploadWhitRout(file: File, rout: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('files', file);

        const req = new HttpRequest('POST', `${this.url}/files/upload?rutaFinal=${rout}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    getFiles() {
        return this.http.get(`${this.url}/files?rutaFinal=`);
    }

    deleteFile(filename: string) {
        return this.http.get(`${this.url}/delete/${filename}?rutaFinal=`);
    }

    uploadFile(file: File, ruta: string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('files', file);

        const req = new HttpRequest('POST', `${this.url}/files/upload?rutaFinal=${ruta}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

}
