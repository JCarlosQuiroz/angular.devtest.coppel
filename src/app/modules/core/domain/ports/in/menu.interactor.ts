import { Menu } from "../../models/Menu";

/**
 */
export abstract class MenuInteractor {

    abstract getMenus(menuName: string, idStatus: number): Promise<Menu[]>;

    abstract getParents(menuName: string, idStatus: number): Promise<Menu[]>;

    abstract getMenusByIdParent(idParent: number, menuName: string, idStatus: number): Promise<Menu[]>;

    abstract getMenuById(idMenu: number): Promise<Menu>;

    abstract save(menu: Menu): Promise<Menu>;

    abstract disableMenu(menu: Menu): Promise<Menu>;

    abstract enableMenu(menu: Menu): Promise<Menu>;

    abstract deleteMenu(menu: Menu): Promise<Menu>;
}