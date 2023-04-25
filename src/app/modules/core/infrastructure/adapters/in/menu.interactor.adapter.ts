import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Menu } from "../../../domain/models/Menu";
import { MenuResponse } from "../../../domain/models/response/MenuResponse";
import { MenuInteractor } from "../../../domain/ports/in/menu.interactor";
import { MenuService } from "../../../domain/ports/out/menu.service";
import { MessageService } from "../../../domain/ports/out/message.service";

@Injectable({ providedIn: "root" })

export class MenuInteractorAdapter implements MenuInteractor {
    private title: string = 'Menú';

    /**
     * 
     * @param menuService 
     * @param message 
     * @param location 
     */
    constructor(
        private menuService: MenuService,
        private message: MessageService,
        private location: Location
    ) { }

    /**
     * 
     * @param menuName 
     * @param idStatus 
     * 
     * @returns Promise<Menu[]>
     * @description Regresa listado de menus
     */
    async getMenus(menuName: string, idStatus: number): Promise<Menu[]> {
        let menuList: Menu[]
        let menuResponse: MenuResponse;

        menuResponse = await this.menuService.getMenu(menuName, idStatus).finally().catch(res => res);

        if (menuResponse.statusText == "OK") {
            menuList = menuResponse.data;
        } else {
            this.message.dialog('warning', { title: this.title, message: menuResponse.message });
            return Promise.reject(menuResponse.message);
        }

        return menuList;

    }

    /**
     * 
     * @param idMenu 
     * @returns Promise<Menu>
     * @description Regresa objeto "Menu"
     */
    async getMenuById(idMenu: number): Promise<Menu> {
        let menu: Menu
        let menuResponse: MenuResponse;

        menuResponse = await this.menuService.getMenuById(idMenu).finally().catch(res => res);

        if (menuResponse.statusText == "OK") {
            menu = menuResponse.data[0];
        } else {
            this.message.dialog('warning', { title: this.title, message: menuResponse.message });
            return Promise.reject(menuResponse.message);
        }

        return menu;
    }

    /**
     * 
     * @param menuName 
     * @param idStatus 
     * @returns Promise<Menu[]>
     * @description Regresa listado de menus que sean padre
     */
    async getParents(menuName: string, idStatus: number): Promise<Menu[]> {
        let menuResponse: MenuResponse;
        let parentList: Menu[];
        menuResponse = await this.menuService.getParents(menuName, idStatus).finally().catch(res => res);
        if (menuResponse.statusText == "OK") {
            parentList = menuResponse.data;
        } else {
            this.message.dialog('warning', { title: this.title, message: menuResponse.message });
            return Promise.reject(menuResponse.message);
        }
        return parentList;
    }

    /**
     * 
     * @param idParent 
     * @param menuName 
     * @param idStatus 
     * @returns Promise<Menu[]>
     * @description Regresa listado de menus por idParent
     */
    async getMenusByIdParent(idParent: number, menuName: string, idStatus: number): Promise<Menu[]> {
        let menuResponse: MenuResponse;
        let parentList: Menu[];
        menuResponse = await this.menuService.getMenusByIdParent(idParent, menuName, idStatus).finally().catch(res => res);
        if (menuResponse.statusText == "OK") {
            parentList = menuResponse.data;
        } else {
            this.message.dialog('warning', { title: this.title, message: menuResponse.message });
            return Promise.reject(menuResponse.message);
        }
        return parentList;
    }

    /**
     * 
     * @param menu 
     * @returns Promise<Menu[]>
     * @description guarda menu
     */
    async save(menu: Menu): Promise<Menu> {
        let menuResponse: MenuResponse;
        menuResponse = await this.menuService.save(menu).finally();
        if (menuResponse.statusText == "OK") {
            menu = menuResponse.data[0];
            this.message.dialog('success', { title: this.title, message: menuResponse.message }).then(res => {
                this.location.back();
            });
        } else {
            this.message.dialog('warning', { title: this.title, message: menuResponse.message });
            return Promise.reject(menuResponse.message);
        }
        return menu;
    }

    /**
     * 
     * @param menu 
     * @returns Promise<Menu[]>
     * @description deshabilita menu
     */
    async disableMenu(menu: Menu): Promise<Menu> {
        let menuResponse: MenuResponse;
        const confirm = await this.message.confirm('warning', { title: this.title, message: '¿Esta seguro de deshabilitar el registro?' }).finally();
        if (confirm) {
            menuResponse = await this.menuService.disableMenu(menu).finally();
            if (menuResponse.statusText == "OK") {
                menu = menuResponse.data[0];
                this.message.dialog('success', { title: this.title, message: menuResponse.message });
            } else {
                this.message.dialog('warning', { title: this.title, message: menuResponse.message });
                return Promise.reject(menuResponse.message);
            }
            return menu;
        } else {
            return Promise.reject(false);
        }
    }

    /**
     * 
     * @param menu 
     * @returns Promise<Menu[]>
     * @description habilita menu
     */
    async enableMenu(menu: Menu): Promise<Menu> {
        let menuResponse: MenuResponse;
        const confirm = await this.message.confirm('warning', { title: this.title, message: '¿Esta seguro de habilitar el registro?' }).finally();
        if (confirm) {
            menuResponse = await this.menuService.enableMenu(menu).finally();
            if (menuResponse.statusText == "OK") {
                menu = menuResponse.data[0];
                this.message.dialog('success', { title: this.title, message: menuResponse.message });
            } else {
                this.message.dialog('warning', { title: this.title, message: menuResponse.message });
                return Promise.reject(menuResponse.message);
            }
            return menu;
        } else {
            return Promise.reject(false);
        }
    }

    /**
     * 
     * @param menu 
     * @returns Promise<Menu[]>
     * @description borrado logico de menu
     */
    async deleteMenu(menu: Menu): Promise<Menu> {
        let menuResponse: MenuResponse;
        const confirm = await this.message.confirm('warning', { title: this.title, message: '¿Esta seguro de eliminar el registro?' }).finally();
        if (confirm) {
            menuResponse = await this.menuService.deleteMenu(menu).finally();
            if (menuResponse.statusText == "OK") {
                menu = menuResponse.data[0];
                this.message.dialog('success', { title: this.title, message: menuResponse.message });
            } else {
                this.message.dialog('warning', { title: this.title, message: menuResponse.message });
                return Promise.reject(menuResponse.message);
            }
            return menu;
        } else {
            return Promise.reject(false);
        }
    }
}