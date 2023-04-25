import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActionMenu } from "src/app/modules/core/domain/models/ActionMenu";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './add-actionMenu.component.html'
})

export class AddActionMenuComponent implements OnInit {
    actionMenuForm!: FormGroup;
    @Input()
    actionMenu!: ActionMenu;

    /**
     *
     * @param formBuilder
     * @param modal
     */
    constructor(
        private formBuilder: FormBuilder,
        private modal: NgbActiveModal
    ) { }

    /**
     */
    ngOnInit() {
        this.actionMenuForm = this.formBuilder.group({
            idActionMenu: this.actionMenu ? this.actionMenu.idActionMenu : null,
            actionMenuName: [this.actionMenu ? this.actionMenu.actionMenuName : null, Validators.required]
        })
    }

    /**
     */
    add() {
        if (this.actionMenuForm.valid) {
            const actionMenu: ActionMenu = {
                idActionMenu: this.actionMenuForm.controls["idActionMenu"].value,
                actionMenuName: this.actionMenuForm.controls["actionMenuName"].value
            }
            console.log(actionMenu)
            this.modal.close(actionMenu);
        }
    }
}
