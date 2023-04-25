import { RoleResponse } from "../../models/response/RoleResponse";
import { Role } from "../../models/Role";

export abstract class RoleService {
    /**
     * @param roleName 
     * @param idStatus 
     */
    abstract getRoles(roleName: string, idStatus: number): Promise<RoleResponse>;
    /**
     * @param idRole 
     */
    abstract getById(idRole: number): Promise<RoleResponse>;
    /**
     * @param role 
     */
    abstract saveRole(role: Role): Promise<RoleResponse>;
    /**
     * @param role 
     */
    abstract disableRole(role: Role): Promise<RoleResponse>;
    /**
     * @param role 
     */
    abstract enableRole(role: Role): Promise<RoleResponse>;
    /**
     * @param role 
     */
    abstract deleteRole(role: Role): Promise<RoleResponse>;
}