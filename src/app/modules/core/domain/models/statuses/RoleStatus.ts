import { Status } from "../Status";

/**
 * @description clase con atributos estaticos para estatus de menú
 */
export class RoleStatus {
    static readonly ENABLE = 1;
    static readonly DISABLE = 2;
    static readonly LOCK = 3;
    static readonly DELETE = 99;

    /**
     * @description Regresa el nombre del estatus
     * @param idStatus 
     * @returns statusName : string
     */
    static getStatusName(idStatus: number): string {
        let status: string;
        switch (idStatus) {
            case this.ENABLE:
                status = "Habilitado";
                break;
            case this.DISABLE:
                status = "Deshabilitado";
                break;
            case this.LOCK:
                status = "Bloqueado";
                break;
            case this.DELETE:
                status = "Eliminado";
                break;
            default:
                status = "Estado no válido";
                break;
        }
        return status;
    }

/**
 * @description Retorna array de estatus
 * @returns Status[]
 */
    static toArray(): Status[] {
        return [
            { idStatus: this.ENABLE, statusName: this.getStatusName(this.ENABLE) },
            { idStatus: this.DISABLE, statusName: this.getStatusName(this.DISABLE) },
            { idStatus: this.LOCK, statusName: this.getStatusName(this.LOCK) },
            { idStatus: this.DELETE, statusName: this.getStatusName(this.DELETE) },
        ]
    }
}