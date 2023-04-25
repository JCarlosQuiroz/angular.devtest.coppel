import { Injectable, InjectionToken } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Menu } from "../../../domain/models/Menu";
import { MenuResponse } from "../../../domain/models/response/MenuResponse";
import { MenuService } from "../../../domain/ports/out/menu.service";
import { environment } from "src/environments/environment";

@Injectable({providedIn:"root"})
export class MenuServiceAdapter implements MenuService {
    url: string = environment.api;
    /**
     * 
     * @param http 
     */
    constructor(
        private http: HttpClient
    ) {}

    /**
     * 
     * @param menuName 
     * @param idStatus 
     * @returns Promise<MenuResponse>
     * @description Consume servicio para obtener menus
     */
    async getMenu(  menuName: string, idStatus: number ): Promise<MenuResponse> {
        let menuList : MenuResponse;
        menuList = await this.http.get<MenuResponse>(`${this.url}/menus?menuName=${menuName ? menuName: ""}&idStatus=${idStatus ? idStatus : ""}`)
            .toPromise()
            .catch( err => err);

        return menuList;

    }

    /**
     * 
     * @param menuName 
     * @param idStatus 
     * @returns @returns Promise<MenuResponse>
     * @description Consume servicio para obtener menus que sean padres
     */
    async getParents( menuName: string, idStatus: number ): Promise<MenuResponse> {
        return await this.http
            .get<MenuResponse>(`${this.url}/menus/parents?menuName=${menuName ? menuName: ""}&idStatus=${idStatus ? idStatus : ""}`)
            .toPromise()
            .catch( err => err );
    }

    /**
     * 
     * @param idParent 
     * @param menuName 
     * @param idStatus 
     * @returns @returns Promise<MenuResponse>
     * @description Consume servicio para obtener menus por idParent
     */
    async getMenusByIdParent( idParent: number, menuName: string, idStatus: number ): Promise<MenuResponse> {
        return await this.http
            .get<MenuResponse>(`${this.url}/menus/parents/${idParent}?menuName=${menuName ? menuName: ""}&idStatus=${idStatus ? idStatus : ""}`)
            .toPromise()
            .catch( err => err );
    }

    /**
     * 
     * @param menu 
     * @returns @returns Promise<MenuResponse>
     * @description Consume servicio para guardar menu
     */
    async save( menu : Menu ): Promise<MenuResponse> {
        return await this.http
            .post<MenuResponse>(`${this.url}/menus`, menu)
            .toPromise()
            .catch( err => err );
    }

    /**
     * 
     * @param idMenu 
     * @returns @returns Promise<MenuResponse>
     * @description Consume servicio para obtener menus por idMenu
     */
    async getMenuById( idMenu: number ) {
        return await this.http
            .get<MenuResponse>(`${this.url}/menus/${idMenu}`)
            .toPromise()
            .catch( err => err );
    }

    /**
     * 
     * @param menu 
     * @returns @returns Promise<MenuResponse>
     * @description Consume servicio para deshabilitar menu
     */
    async disableMenu( menu: Menu ): Promise<MenuResponse> {
        return await this.http
            .put(`${this.url}/menus/disable`, menu)
            .toPromise()
            .catch( err => err);
    }

    /**
     * 
     * @param menu 
     * @returns Promise<MenuResponse>
     * @description Consume servicio para habilitar menu
     */
    async enableMenu( menu: Menu ): Promise<MenuResponse> {
        return await this.http
            .put(`${this.url}/menus/enable`, menu)
            .toPromise()
            .catch( err => err);
    }

    /**
     * 
     * @param menu 
     * @returns Promise<MenuResponse>
     * @description Consume servicio para hacer un borrado logico del menu
     */
    async deleteMenu( menu: Menu ): Promise<MenuResponse> {
        return await this.http
            .put(`${this.url}/menus/delete`, menu)
            .toPromise()
            .catch( err => err);
    }

}