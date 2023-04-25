import { Status } from "../Status";


/**
 * @description clase con atributos estaticos para estatus de Marcas
 */
// export class UserStatus {
//     static readonly ENABLE  = 1;
//     static readonly DISABLE = 2;
//     static readonly LOCK    = 3;
//     static readonly DELETE  = 99;


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
//             {idStatus: this.ENABLE  , statusName: this.getStatusName(this.ENABLE)   },
//             {idStatus: this.DISABLE , statusName: this.getStatusName(this.DISABLE)  },
//             {idStatus: this.DELETE  , statusName: this.getStatusName(this.DELETE)   },
//         ]
//     }
// }

export enum UserStatus{
  ENABLE = 1,
  DISABLE = 2,
  LOCK = 3,
  DELETE = 99,
}
export namespace UserStatus {
  export function getStatusName(status: number): string {
    switch (status) {
      case UserStatus.ENABLE:
        return "Activo";
      case UserStatus.DISABLE:
        return "Inactivo";
      case UserStatus.DELETE:
        return "Eliminado";
      default:
        return "";
    }
  }

  export function toArray(): Status[] {
    return [
      { idStatus: UserStatus.ENABLE, statusName: UserStatus.getStatusName(UserStatus.ENABLE) },
      { idStatus: UserStatus.DISABLE, statusName: UserStatus.getStatusName(UserStatus.DISABLE) },
      { idStatus: UserStatus.LOCK, statusName: UserStatus.getStatusName(UserStatus.LOCK) },
      { idStatus: UserStatus.DELETE, statusName: UserStatus.getStatusName(UserStatus.DELETE) },
    ];
  }
}
