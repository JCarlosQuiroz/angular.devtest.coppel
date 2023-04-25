import { Injectable         } from "@angular/core";
import { StateIdResponse    } from "../../../domain/models/response/StateIdResponse";
import { SuburbResponse     } from "../../../domain/models/response/SuburbResponse";
import { Suburb             } from "../../../domain/models/Suburb";
import { StateId            } from "../../../domain/models/valueObjects/StateId";
import { SuburbInteractor   } from "../../../domain/ports/in/suburb.interactor";
import { MessageService     } from "../../../domain/ports/out/message.service";
import { SuburbService      } from "../../../domain/ports/out/suburb.service";

@Injectable({providedIn: "root"})
export class SuburbInteractorAdapter implements SuburbInteractor {
    private title: string = 'Suburbio';

    constructor(
        private message         : MessageService,
        private suburbService   : SuburbService,
    ){}
    
    /**
     * 
     * @param idSuburb 
     * @returns 
     */
    async getSuburbsById( idSuburb: number ): Promise<Suburb[]> {
        let suburb: Suburb[];
        let suburbResponse : SuburbResponse;

        suburbResponse = await this.suburbService.getSuburbById(idSuburb).finally().catch(res => res);
        
        if( suburbResponse.statusText == "OK" ) {
            suburb = suburbResponse.data;
        } else {
            this.message.dialog( 'warning', {title: this.title, message: suburbResponse.message } );  
            return Promise.reject(suburbResponse.message);
        }

        return suburb;
    }

    /**
     * 
     * @param idCologne 
     * @returns 
     */
    async getCologneById( idCologne: number ): Promise<Suburb> {
        let cologne: Suburb;
        let suburbResponse : SuburbResponse;

        suburbResponse = await this.suburbService.getCologneById(idCologne).finally().catch(res => res);
        
        if( suburbResponse.statusText == "OK" ) {
            cologne = suburbResponse.data[0];
        } else {
            this.message.dialog( 'warning', {title: this.title, message: suburbResponse.message } );  
            return Promise.reject(suburbResponse.message);
        }

        return cologne;
    }
    /**
     */
    async getStates(): Promise<StateId[]> {
        let stateId : StateId[];
        let stateIdResponse: StateIdResponse;

        stateIdResponse = await this.suburbService.getStates().finally().catch(res => res);

        if( stateIdResponse.statusText == "OK" ) {
            stateId = stateIdResponse.data;
        } else {
            this.message.dialog( 'warning', {title: this.title, message: stateIdResponse.message } );  
            return Promise.reject(stateIdResponse.message);
        }

        return stateId;
    }
}






