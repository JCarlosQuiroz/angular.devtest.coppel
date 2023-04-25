import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TypeMessage } from "../../../domain/models/TypeMessage";

@Component({
    templateUrl: './message.component.html',
    styleUrls: [ './message.component.css' ]
})

export class MessageComponent implements OnInit {
    @Input() data! : TypeMessage;
    @Input() isConfirm : boolean = false;
    @Input() isPrompt : boolean = false;
    @Input() type! : string;
    isInvalid = false;
    textMessage = '';
    icon = '';
    
    /**
     * 
     * @param modal 
     */
    constructor( public modal : NgbActiveModal ){}

    /**
     */
    ngOnInit(){
        
        if( this.type == 'success' ){
            this.icon = 'check_circle';
        }else if( this.type == 'warning' ){
            this.icon = 'warning';
        }else if( this.type == 'error' ){
            this.icon = 'error'
        }
    }

    /**
     * 
     * @param valid 
     */
    closeModal( valid : boolean ){
        if( this.isPrompt && !this.textMessage && valid ){
            this.isInvalid = true;
        }else{
            this.modal.close( valid );
        }
    }
}