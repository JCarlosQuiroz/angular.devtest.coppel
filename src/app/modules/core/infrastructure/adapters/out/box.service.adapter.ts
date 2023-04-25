import { HttpClient, HttpHeaders    } from "@angular/common/http";
import { Injectable                 } from "@angular/core";
import { environment                } from "src/environments/environment";
import { Box                        } from "../../../domain/models/Box";
import { BoxResponse                } from "../../../domain/models/response/BoxResponse";
import { BoxService                 } from "../../../domain/ports/out/box.service";
import * as bcrypt from 'bcryptjs';

@Injectable({providedIn:"root"})
export class BoxServiceAdapter implements BoxService {
    urlDevTestCoppel: string = environment.apiInOutDevTestCP;
    tokenDevTestCoppel: string = this.hashIt(environment.passwordBycryptDevTestCP);

    password : string = '';

    constructor(
        private http: HttpClient
    ) {}





    async getBoxesDevTestCoppel(): Promise<BoxResponse> {
        let boxList : BoxResponse;
        boxList = await this.http.get<BoxResponse>(`${this.urlDevTestCoppel}/treasury/boxes?idStatus=1&hashToken=` + this.tokenDevTestCoppel )
            .toPromise()
            .catch( err => err );
            
        return boxList;
    }

    async getBoxDevTestCoppelById( idBox: number ) {
        return await this.http
            .get<BoxResponse>(`${this.urlDevTestCoppel}/treasury/boxes/${idBox}?hashToken=` + this.tokenDevTestCoppel)
            .toPromise()
            .catch( err => err );
    }


    hashIt(passwordBycrypt: any) : string {
        let password : string;
        let random = Math.round(Math.random()*(12-10)) + 10;

        password = bcrypt.hashSync(passwordBycrypt, (random));
        return password;
    }
}