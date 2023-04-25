import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/modules/core/domain/models/Role';
import { RoleInteractor } from '../../../../../domain/ports/in/role.interactor';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  @Input() roles!: Role;
  roleForm!: FormGroup;
  roleList!: Role[];

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private roleInteractor: RoleInteractor
  ) { }

  ngOnInit() {
    this.getAllRoles();

    this.roleForm = this.formBuilder.group({
      roles: this.roles ? this.roles : null
    });
  }

  add() {
    if (this.roleForm.valid) {

      const roles: Role = this.roleForm.controls['roles'].value;

      this.modal.close(roles);
    }
  }

  getAllRoles() {
    this.roleInteractor.getRoles('', 1).then(roleList => {
      roleList.sort((a, b) => a.roleName < b.roleName ? -1 : 0);
      this.roleList = roleList;
    }).catch(res => res);
  }

}
