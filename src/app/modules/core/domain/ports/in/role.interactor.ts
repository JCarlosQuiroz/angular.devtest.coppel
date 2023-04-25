import { Role } from "../../models/Role";

export abstract class RoleInteractor {
  /**
   * @param roleName 
   * @param idStatus 
   */
  abstract getRoles(roleName: string, idStatus: number): Promise<Role[]>;
  /**
   * @param idRole 
   */
  abstract getById(idRole: number): Promise<Role>;
  /**
   * @param role 
   */
  abstract saveRole(role: Role): Promise<Role>;
  /**
    * @param role 
    */
  abstract disableRole(role: Role): Promise<Role>;
  /**
    * @param role 
    */
  abstract enableRole(role: Role): Promise<Role>;
  /**
    * @param role 
    */
  abstract deleteRole(role: Role): Promise<Role>;
}