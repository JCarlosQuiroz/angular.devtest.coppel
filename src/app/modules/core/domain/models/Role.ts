import { RoleMenu } from "./RoleMenu";

export interface Role {
    idRole: number;
    roleName: string;
    status: number;
    roleMenus: RoleMenu[];
}