import { ActionMenu } from "./ActionMenu";

/**
 */
export interface Menu {
    idMenu: number;
    parent: Menu;
    idAction: number;
    idMenuSection: number;
    type: number;
    order: number;
    icon: string;
    menuName: string;
    status: number;
    actionMenus: ActionMenu[];
    url: string;
    submenu?: Menu[];
    isCollapsed?: boolean;
    isSelected?: boolean;
    isIndeterminate?: boolean;
}