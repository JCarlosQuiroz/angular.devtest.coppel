import { HttpClient     } from "@angular/common/http";
import { Injectable     } from "@angular/core";
import { environment    } from "src/environments/environment";
import { StateIdResponse} from "../../../domain/models/response/StateIdResponse";
import { SuburbResponse } from "../../../domain/models/response/SuburbResponse";
import { SuburbService  } from "../../../domain/ports/out/suburb.service";

@Injectable({providedIn:"root"})
export class SuburbServiceAdapter implements SuburbService {

    url: string = environment.api;
    
    constructor(
        private http: HttpClient
    ) {}

    /**
     * 
     * @param idSuburb 
     * @returns 
     */
    async getSuburbById( idSuburb: number ) {
        return await this.http
            .get<SuburbResponse>(`${this.url}/postalCodes?idPostalCode=${idSuburb}`)
            .toPromise()
            .catch( err => err );
    }

    /**
     * 
     * @param idCologne 
     * @returns 
     */
    async getCologneById( idCologne: number ) {
        return await this.http
            .get<SuburbResponse>(`${this.url}/postalCodes/${idCologne}`)
            .toPromise()
            .catch( err => err );
    }

    async getStates(): Promise<StateIdResponse> {
        return await this.http
        .get<StateIdResponse>(`${this.url}/postalCodes/getStates`)
        .toPromise()
        .catch(err => err);
    }
}