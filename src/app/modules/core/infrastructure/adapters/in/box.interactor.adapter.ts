import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Box } from '../../../domain/models/Box';
import { BoxResponse } from "../../../domain/models/response/BoxResponse";
import { BoxInteractor } from "../../../domain/ports/in/box.interactor";
import { BoxService } from "../../../domain/ports/out/box.service";
import { MessageService } from "../../../domain/ports/out/message.service";


@Injectable({ providedIn: "root" })
export class BoxInteractorAdapter implements BoxInteractor {
    private title: string = "Cajas";

    /**
     * 
     */
    constructor(
        private boxService: BoxService,
        private message: MessageService,
    ) { }

    /**
     * 
     * @returns 
     */


    async getBoxesDevTestCoppel(): Promise<Box[]> {
        let boxList: Box[];
        let boxResponse: BoxResponse;

        boxResponse = await this.boxService.getBoxesDevTestCoppel().finally().catch(res => res);

        if (boxResponse.statusText == "OK") {
            boxList = boxResponse.data;
        } else {
            this.message.dialog('warning', { title: this.title, message: boxResponse.message });
            return Promise.reject(boxResponse.message);
        }

        return boxList;
    }

    async getBoxDevTestCoppelById(idBox: number): Promise<Box> {
        let box: Box;
        let boxResponse: BoxResponse;

        boxResponse = await this.boxService.getBoxDevTestCoppelById(idBox).finally().catch(res => res);

        if (boxResponse.statusText == "OK") {
            box = boxResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: boxResponse.message });
            return Promise.reject(boxResponse.message);
        }

        return box;
    }



} 