import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RoleResponse } from "../../../domain/models/response/RoleResponse";
import { Role } from "../../../domain/models/Role";
import { RoleInteractor } from "../../../domain/ports/in/role.interactor";
import { MessageService } from "../../../domain/ports/out/message.service";
import { RoleService } from "../../../domain/ports/out/role.service";
import { Location } from "@angular/common";

@Injectable({ providedIn: "root" })

export class RoleInteractorAdapter implements RoleInteractor {
    private title: string = "Roles"

    /**
     * @param http 
     */
    constructor(
        private roleService: RoleService,
        private message: MessageService,
        private location: Location,
    ) { }

    /**
     * @param roleName 
     * @param idStatus 
     * @returns 
     */
    async getRoles(roleName: string, idStatus: number): Promise<Role[]> {
        const roleResponse: RoleResponse = await this.roleService.getRoles(roleName, idStatus).finally().catch(res => res);
        if (roleResponse.statusText == 'OK') {
            return roleResponse.data;
        } else {
            this.message.dialog('warning', { title: this.title, message: roleResponse.message });
            return Promise.reject(roleResponse.message);
        }
    }
    /**
     * @param idRole 
     * @returns 
     */
    async getById(idRole: number): Promise<Role> {
        const roleResponse: RoleResponse = await this.roleService.getById(idRole).finally().catch(res => res);
        if (roleResponse.statusText == 'OK') {
            return roleResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: roleResponse.message });
            return Promise.reject(roleResponse.message);
        }
    }
    /**
     * @param role 
     * @returns 
     */
    async saveRole(role: Role): Promise<Role> {
        const roleResponse: RoleResponse = await this.roleService.saveRole(role).finally().catch(res => res);
        if (roleResponse.statusText == 'OK') {
            // this.message.dialog( 'success', {title: this.title, message: roleResponse.message } );  
            // this.location.back();
            // return roleResponse.data[0];

            this.message.dialog('success', { title: this.title, message: roleResponse.message }).then(res => {
                this.location.back();
            });
            return roleResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: roleResponse.message });
            return Promise.reject(roleResponse.message);
        }
    }
    /**
     * @param role 
     * @returns 
     */
    async disableRole(role: Role): Promise<Role> {
        const roleResponse: RoleResponse = await this.roleService.disableRole(role).finally().catch(res => res);
        if (roleResponse.statusText == 'OK') {
            this.message.dialog('success', { title: this.title, message: roleResponse.message });
            return roleResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: roleResponse.message });
            return Promise.reject(roleResponse.message);
        }
    }
    /**
     * @param role 
     * @returns 
     */
    async enableRole(role: Role): Promise<Role> {
        const roleResponse: RoleResponse = await this.roleService.enableRole(role).finally().catch(res => res);
        if (roleResponse.statusText == 'OK') {
            this.message.dialog('success', { title: this.title, message: roleResponse.message });
            return roleResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: roleResponse.message });
            return Promise.reject(roleResponse.message);
        }
    }
    /**
     * @param role 
     * @returns 
     */
    async deleteRole(role: Role): Promise<Role> {
        const roleResponse: RoleResponse = await this.roleService.deleteRole(role).finally().catch(res => res);
        if (roleResponse.statusText == 'OK') {
            this.message.dialog('success', { title: this.title, message: roleResponse.message });
            return roleResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: roleResponse.message });
            return Promise.reject(roleResponse.message);
        }
    }
}