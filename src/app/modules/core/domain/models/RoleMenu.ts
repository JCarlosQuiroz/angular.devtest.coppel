import { ActionMenu } from "./ActionMenu";
import { Menu } from "./Menu";

export interface RoleMenu {
    idRoleMenu: number;
    menu: Menu;
    actionMenus: ActionMenu[];
}