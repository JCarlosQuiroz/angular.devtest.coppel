import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Menu } from "../../../domain/models/Menu";
import { MenuStatus } from "../../../domain/models/statuses/menu.status";
import { MenuInteractor } from "../../../domain/ports/in/menu.interactor";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from "@angular/router";
import { ActionMenu } from "../../../domain/models/ActionMenu";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { Role } from "../../../domain/models/Role";
import { RoleStatus } from "../../../domain/models/statuses/RoleStatus";
import { RoleInteractor } from "../../../domain/ports/in/role.interactor";
import { ThemePalette } from "@angular/material/core";
import { RoleMenu } from "../../../domain/models/RoleMenu";

@Component({
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.css']
})

export class AddRoleComponent implements OnInit {
    roleForm!: FormGroup;
    role!: Role;
    parents: Role[] = [];
    menus!: Menu[];
    idRole!: number;

    /**
     * 
     * @param formBuilder 
     * @param menuInteractor 
     * @param modal 
     * @param route 
     * @param location 
     */
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private roleInteractor: RoleInteractor,
        private menuInteractor: MenuInteractor
    ) {
        this.createForm();
    }

    /**
     * @description Inicializa el objeto menú y checa si recibe parametro para asignar valor
     */
    ngOnInit() {
        this.role = {
            idRole: null!,
            roleName: null!,
            status: null!,
            roleMenus: [],
        }

        this.route.params.subscribe(res => {
            if (res["idRole"]) {
                this.idRole = res["idRole"];
                this.roleInteractor.getById(res["idRole"]).then(role => {
                    this.role = { ...role };
                    this.createForm();
                    this.getParents();
                });
            } else {
                this.role = {
                    idRole: null!,
                    roleName: null!,
                    roleMenus: [],
                    status: 1
                }
                this.getParents();
            }
        })
    }

    async getParents() {
        const parents: Menu[] = await this.menuInteractor.getParents('', MenuStatus.ENABLE).finally().catch(err => err);
        const menus: Menu[] = await this.menuInteractor.getMenus('', MenuStatus.ENABLE).finally().catch(err => err);

        parents.map(parent => {
            parent.submenu = [];
            menus.map(menu => {
                if (menu.parent && parent.idMenu == menu.parent.idMenu) {
                    menu.submenu = [];
                    // this.sortMenu(menu);
                    this.setSelecteds(menu);
                    menus.map(submenu => {
                        if (submenu.parent && menu.idMenu == submenu.parent.idMenu) {
                            this.sortMenu(submenu);
                            this.setSelecteds(submenu);
                            menu.submenu!.push(submenu);
                        }
                    });

                    parent.submenu!.push(menu);
                }
            });
            parent.submenu.sort((a, b) => a.idMenu < b.idMenu ? -1 : 0);
            this.setSelecteds(parent);
        });
        parents.sort((a, b) => a.idMenu < b.idMenu ? -1 : 0);
        this.menus = parents;

    }

    /**
     * @author ños
     */
    createForm() {
        this.roleForm = this.formBuilder.group({
            idRole: [this.role ? this.role.idRole : null],
            roleName: [this.role ? this.role.roleName : null, [Validators.required, Validators.maxLength(100)]],
            roleMenus: [this.role ? this.role.roleMenus : null],
        });


    }

    /**
     * @author ños
     */
    save() {

        if (this.roleForm.valid) {
            const menus: RoleMenu[] = this.getSelecteds(this.menus);

            this.role.roleName = this.roleForm.controls["roleName"].value;
            this.role.roleMenus = menus;
            // console.log(this.role);
            this.roleInteractor.saveRole(this.role).then(role => {
                this.role = role;
            }).catch(res => res);
        }

    }

    /**
     * @author ños
     */
    back() {
        this.location.back()
    }

    checkChilds(menu: Menu, isChecked: boolean) {
        menu.isSelected = isChecked;
        if (menu.submenu && menu.submenu.length) {
            menu.submenu.map(submenu => {
                submenu.isSelected = isChecked;
                if (submenu.submenu && submenu.submenu.length) {
                    this.checkChilds(submenu, isChecked);
                }
            });
        }
    }

    checkAll(menu: Menu) {
        return menu.isSelected = menu.isSelected || (menu.submenu && menu.submenu.length && menu.submenu.every(t => t.isSelected) ||
            menu.actionMenus.some(actionMenu => actionMenu.isSelected));
    }

    someComplete(menu: Menu): boolean {
        if (menu.submenu == null) {
            return false;
        }
        let numSelected = 0;
        menu.submenu.map(submenu => {
            if (submenu.isSelected) {
                numSelected++;
            }
        });
        if (numSelected > 0 && numSelected < menu.submenu.length) {
            return true;
        } else {
            return false;
        }
    }

    getSelecteds(menus: Menu[]): RoleMenu[] {
        let roleMenus: RoleMenu[] = [];
        menus.map(menu => {
            if (menu.submenu && menu.submenu.length) {
                roleMenus = roleMenus.concat(this.getSelecteds(menu.submenu));
            } else {
                if (menu.isSelected) {
                    const actionMenus: ActionMenu[] = [];
                    if (menu.actionMenus && menu.actionMenus.length) {
                        menu.actionMenus.map(actionMenu => {
                            if (actionMenu.isSelected) {
                                actionMenus.push(actionMenu);
                            }
                        })
                    }
                    const roleMenu: RoleMenu = {
                        idRoleMenu: null!,
                        actionMenus: actionMenus,
                        menu: menu
                    }
                    roleMenus.push(roleMenu);
                }
            }
        });
        return roleMenus;
    }

    setSelecteds(menu: Menu) {
        if (this.role) {
            this.role.roleMenus.map(roleMenu => {
                if (roleMenu.menu.idMenu == menu.idMenu) {
                    menu.isSelected = true;

                    if (roleMenu.actionMenus.length) {
                        roleMenu.actionMenus.map(rActionMenu => {
                            menu.actionMenus.map(actionMenu => {
                                if (rActionMenu.idActionMenu == actionMenu.idActionMenu) {
                                    actionMenu.isSelected = true;
                                }
                            });
                        });
                    }
                }
            });
        }
    }

    sortMenu(menu: Menu) {
        if (menu.submenu && menu.submenu.length) {
            menu.submenu.sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }

                if (a.order < b.order) {
                    return -1;
                }
                return 0;
            });
        }
        if (menu.actionMenus && menu.actionMenus.length) {
            menu.actionMenus.sort((a, b) => {
                if (a.idActionMenu > b.idActionMenu) {
                    return 1;
                }

                if (a.idActionMenu < b.idActionMenu) {
                    return -1;
                }
                return 0;
            });
        }
    }

}