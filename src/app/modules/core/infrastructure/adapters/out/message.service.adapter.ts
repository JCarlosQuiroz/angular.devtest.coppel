import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TypeMessage } from "../../../domain/models/TypeMessage";
import { MessageService } from "../../../domain/ports/out/message.service";
import { MessageComponent } from "../../components/message/message.component";


@Injectable({providedIn: "root"})
export class MessageServiceAdapter implements MessageService{
    /**
     * 
     * @param modalService 
     */
    constructor( private modalService : NgbModal ){}

    /**
     * 
     * @param type 
     * @param data 
     * @returns 
     */
    async dialog( type: string, data: TypeMessage ) {
        const dialogRef = this.modalService.open( MessageComponent, { centered: true } );
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.type = type;
        return dialogRef.result.then( resp => resp );
    }

    /**
     * 
     * @param type 
     * @param data 
     * @returns 
     */
    confirm( type: string, data: TypeMessage ) {
        const dialogRef = this.modalService.open( MessageComponent, { centered: true } );
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.isConfirm = true;
        dialogRef.componentInstance.type = type;
        return dialogRef.result.then( resp => resp, dismiss => "dismiss" );
    }

    /**
     * 
     * @param type 
     * @param data 
     * @returns 
     */
    prompt( type: string, data: TypeMessage ) {
        const dialogRef = this.modalService.open( MessageComponent, { centered: true } );
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.isPrompt = true;
        dialogRef.componentInstance.type = type;
        return dialogRef.result.then( resp => resp, dismiss => "dismiss" );
    }
}