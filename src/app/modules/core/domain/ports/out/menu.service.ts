import { Menu } from "../../models/Menu";
import { MenuResponse } from "../../models/response/MenuResponse";

export abstract class MenuService {
    /**
     * 
     * @param menuName 
     * @param idStatus 
     * @return Promise<MenuResponse>
     */
    abstract getMenu(menuName: string, idStatus: number): Promise<MenuResponse>;
    /**
     * 
     * @param menuName 
     * @param idStatus 
     */
    abstract getParents(menuName: string, idStatus: number): Promise<MenuResponse>;
    /**
     * 
     * @param idParent 
     * @param menuName 
     * @param idStatus 
     * @return Promise<MenuResponse>
     */
    abstract getMenusByIdParent(idParent: number, menuName: string, idStatus: number): Promise<MenuResponse>;
    /**
     * 
     * @param idMenu 
     * @return Promise<MenuResponse>
     */
    abstract getMenuById(idMenu: number): Promise<MenuResponse>;
    /**
     * 
     * @param menu 
     * @return Promise<MenuResponse>
     */
    abstract save(menu: Menu): Promise<MenuResponse>;
    /**
     * 
     * @param menu 
     * @return Promise<MenuResponse>
     */
    abstract disableMenu(menu: Menu): Promise<MenuResponse>;
    /**
     * 
     * @param menu 
     * @return Promise<MenuResponse>
     */
    abstract enableMenu(menu: Menu): Promise<MenuResponse>;
    /**
     * 
     * @param menu 
     * @return Promise<MenuResponse>
     */
    abstract deleteMenu(menu: Menu): Promise<MenuResponse>;
}