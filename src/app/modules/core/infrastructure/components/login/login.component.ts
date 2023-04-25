import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserInteractor } from "../../../domain/ports/in/user.interactor";
import { MessageService } from "../../../domain/ports/out/message.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    userForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userInteractor: UserInteractor,
        private router: Router,
        private message         : MessageService,
    ){
        this.userInteractor.getUserSession().subscribe( user => {
            if( user ) {

                if(user.status == 2){
                    this.userInteractor.endSession();
                    this.message.dialog( 'warning', {title: "Observacion", message: "Usuario deshabilitado" } );
                    return;  
                }

                this.router.navigate(['/']);
            }
        })
    }
    /**
     */
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            userName: ['', Validators.required ],
            password: ['', Validators.required]
        });
    }
    /**
     */
    login() {
        if( this.userForm.valid ) {
            const userName: string = this.userForm.controls["userName"].value;
            const password: string = this.userForm.controls["password"].value;

            this.userInteractor.startSession( userName, password );
        }
    }
}