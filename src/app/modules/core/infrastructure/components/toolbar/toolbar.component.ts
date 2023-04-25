import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { User } from "../../../domain/models/User";
import { UserInteractor } from "../../../domain/ports/in/user.interactor";

@Component({
    selector:'toolbar-component',
    templateUrl: './toolbar.component.html',
    styleUrls: [ './toolbar.component.css' ]
})

export class ToolbarComponent implements OnInit {
    @Output() showHide = new EventEmitter();
    user!: User;
    /**
     * 
     * @param userInteractor 
     */
    constructor(
        private userInteractor: UserInteractor,
    ){}

    /**
     */
    ngOnInit(){
        this.userInteractor.getUserSession().subscribe( user => {
            this.user = user;
        })

        this.showHideNav();
    }

    /**
     */
    showHideNav() {
        this.showHide.emit();
    }
    /**
     */
    closeSession() {
        this.userInteractor.endSession();
        window.location.reload();
    }
}