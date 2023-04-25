import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RoleResponse } from "../../../domain/models/response/RoleResponse";
import { Role } from "../../../domain/models/Role";
import { RoleService } from "../../../domain/ports/out/role.service";

@Injectable({ providedIn: "root" })

export class RoleServiceAdapter implements RoleService {
    private url: string = environment.api;

    /**
     * @param http 
     */
    constructor(
        private http: HttpClient,
    ) { }

    /**
     * @param roleName 
     * @param idStatus 
     * @returns 
     */
    async getRoles(roleName: string, idStatus: number): Promise<RoleResponse> {
        return await this.http.get<RoleResponse>(`${this.url}/roles?roleName=${roleName}&idStatus=${idStatus ? idStatus : ""}`).toPromise().catch(res => res);
    }
    /**
     * @param idRole 
     * @returns 
     */
    async getById(idRole: number): Promise<RoleResponse> {
        return await this.http.get<RoleResponse>(`${this.url}/roles/${idRole}`).toPromise().catch(res => res);
    }
    /**
     * @param role 
     * @returns 
     */
    async saveRole(role: Role): Promise<RoleResponse> {
        return await this.http.post<RoleResponse>(`${this.url}/roles`, role).toPromise().catch(res => res);
    }
    /**
     * @param role 
     * @returns 
     */
    async disableRole(role: Role): Promise<RoleResponse> {
        return await this.http.post<RoleResponse>(`${this.url}/roles/disableRole`, role).toPromise().catch(res => res);
    }
    /**
     * @param role 
     * @returns 
     */
    async enableRole(role: Role): Promise<RoleResponse> {
        return await this.http.post<RoleResponse>(`${this.url}/roles/enableRole`, role).toPromise().catch(res => res);
    }
    /**
     * @param role 
     * @returns 
     */
    async deleteRole(role: Role): Promise<RoleResponse> {
        return await this.http.post<RoleResponse>(`${this.url}/roles/deleteRole`, role).toPromise().catch(res => res);
    }
}