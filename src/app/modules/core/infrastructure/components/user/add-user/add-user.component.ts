import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/modules/core/domain/models/Role';
import { User } from 'src/app/modules/core/domain/models/User';
import { UserInteractor } from 'src/app/modules/core/domain/ports/in/user.interactor';
import { MessageService } from 'src/app/modules/core/domain/ports/out/message.service';
import { RoleInteractor } from '../../../../domain/ports/in/role.interactor';
import { Location } from "@angular/common";
import { Person } from 'src/app/modules/core/domain/models/Person';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRoleComponent } from './add-role/add-role.component';
// import { StaffPersonInteractor              } from 'src/app/modules/staff/domain/ports/in/staffPerson.interactor';
// import { StaffPerson                        } from 'src/app/modules/staff/domain/models/StaffPerson';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    user!: User;
    userSesion!: User;
    roleList!: Role[];
    // personList: StaffPerson[];

    date: Date = new Date();
    userForm!: FormGroup;
    idUser!: number;
    personForm!: Person;

    displayedColumns: string[] = ['roleName', 'actions'];

    constructor(
        private userInteractor: UserInteractor,
        private message: MessageService,
        private roleInteractor: RoleInteractor,
        private location: Location,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        // private personInteractor: StaffPersonInteractor,
        private modal: NgbModal,
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getUser();
        this.getAllRoles();
        // this.getAllPerson();

        this.user = {
            idUser: null!,
            status: null!,
            userName: null!,
            password: null!,
            person: null!,
            roles: [],
            expiredAt: null!,
            token: null!
        }


        this.route.params.subscribe(res => {
            if (res['idUser']) {

                this.idUser = res['idUser'];

                this.userInteractor.getUserById(this.idUser).then(user => {
                    this.user = { ...user };
                    this.createForm();
                });
            }
        });
    }

    getUser() {
        this.userInteractor.getUserSession().subscribe(user => {
            this.userSesion = user;
        });
    }

    getAllRoles() {
        this.roleInteractor.getRoles('', 1).then(roleList => {
            roleList.sort((a, b) => a.roleName < b.roleName ? -1 : 0);
            this.roleList = roleList;
        }).catch(res => res);
    }

    // getAllPerson() {
    //     this.personInteractor.getStaffPersons().then(personList => {
    //         personList.sort((a, b) => a.firstName < b.firstName ? -1 : 0);
    //         this.personList = personList;
    //     }).catch(res => res);
    // }

    back() {
        this.location.back();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            firstName: [this.user ? this.user.person.firstName : null, [Validators.required]],
            middleName: [this.user ? this.user.person.middleName : null,],
            lastName: [this.user ? this.user.person.lastName : null, [Validators.required]],
            secondLastName: [this.user ? this.user.person.secondLastName : null,],
            userName: [this.user ? this.user.userName : null, [Validators.required]],
            password: [this.user ? this.user.password : null, [Validators.required]],
        });
    }

    saveUser() {
        if (this.userForm.valid) {

            this.personForm = {
                idPerson: null!,
                firstName: this.userForm.controls['firstName'].value,
                middleName: this.userForm.controls['middleName'].value,
                lastName: this.userForm.controls['lastName'].value,
                secondLastName: this.userForm.controls['secondLastName'].value,
            }

            this.user.userName = this.userForm.controls['userName'].value;
            this.user.password = this.userForm.controls['password'].value;

            this.user.person = this.personForm;

            this.user.status = 1;


            this.userInteractor.saveUser(this.user).then(res => {
                this.user = { ...res };
            }).catch(err => err);
        }
    }

    addRoleToUser() {
        this.modalRoles();
    }

    private modalRoles(role?: Role) {
        const modal = this.modal.open(AddRoleComponent, { centered: true });

        modal.componentInstance.role = role;

        modal.result.then(resp => {
            if (resp) {

                if (role && role.idRole) {

                    this.user.roles.map(res => {
                        if (res.idRole == resp.idRole) {
                            res.roleName = resp.roleName;
                        }
                    });

                } else {
                    this.user.roles.push(resp);
                }

                this.user.roles = [...this.user.roles];
            }
        });

    }

    deleteRole(role: Role) {
        for (let index = 0; index < this.user.roles.length; index++) {
            if (this.user.roles[index].idRole == role.idRole) {
                this.user.roles.splice(index, 1);
            }
        }
        this.user.roles = [...this.user.roles];
    }

}
