
import { Status } from "../Status";

/**
 * @description clase con atributos estaticos para estatus de menú
 */
// export class MenuStatus {
//     static readonly ENABLE = 1;
//     static readonly DISABLE = 2;
//     static readonly LOCK = 3;
//     static readonly DELETE = 99;

//     /**
//      * @description Regresa el nombre del estatus
//      * @param idStatus
//      * @returns statusName : string
//      */
//     static getStatusName(idStatus: number): string {
//         let status: string;
//         switch (idStatus) {
//             case this.ENABLE:
//                 status = "Habilitado";
//                 break;
//             case this.DISABLE:
//                 status = "Deshabilitado";
//                 break;
//             case this.LOCK:
//                 status = "Bloqueado";
//                 break;
//             case this.DELETE:
//                 status = "Eliminado";
//                 break;
//             default:
//                 status = "Estado no válido";
//                 break;
//         }
//         return status;
//     }

//     /**
//      * @description Retorna array de estatus
//      * @returns Status[]
//      */
//     static toArray(): Status[] {
//         return [
//             { idStatus: this.ENABLE, statusName: this.getStatusName(this.ENABLE) },
//             { idStatus: this.DISABLE, statusName: this.getStatusName(this.DISABLE) },
//             { idStatus: this.LOCK, statusName: this.getStatusName(this.LOCK) },
//             { idStatus: this.DELETE, statusName: this.getStatusName(this.DELETE) },
//         ]
//     }
// }

export enum MenuStatus {
  ENABLE = 1,
  DISABLE = 2,
  LOCK = 3,
  DELETE = 99,
}
export namespace MenuStatus {
  export function getStatusName(status: number): string {
    switch (status) {
      case MenuStatus.ENABLE:
        return "Activo";
      case MenuStatus.DISABLE:
        return "Inactivo";
      case MenuStatus.DELETE:
        return "Eliminado";
      default:
        return "";
    }
  }

  export function toArray(): Status[] {
    return [
      { idStatus: MenuStatus.ENABLE, statusName: MenuStatus.getStatusName(MenuStatus.ENABLE) },
      { idStatus: MenuStatus.DISABLE, statusName: MenuStatus.getStatusName(MenuStatus.DISABLE) },
      { idStatus: MenuStatus.LOCK, statusName: MenuStatus.getStatusName(MenuStatus.LOCK) },
      { idStatus: MenuStatus.DELETE, statusName: MenuStatus.getStatusName(MenuStatus.DELETE) },
    ];
  }
}
