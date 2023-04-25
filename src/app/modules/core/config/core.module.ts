import { NgModule                   } from "@angular/core";
import { MessageComponent           } from "../infrastructure/components/message/message.component";
import { MenuModule, MenuComponents } from "./menu.module";
import { MessageService             } from "../domain/ports/out/message.service";
import { MessageServiceAdapter      } from "../infrastructure/adapters/out/message.service.adapter";
import { UserModule, UserComponents } from "./user.module";
import { SessionModule              } from "./session.module";
import { RoleModule, RoleComponents } from "./role.module";
import { SuburbModule               } from "./suburb.module";
import { FileModule                 } from "./file.module";
import { BoxModule                  } from "./box.module";


/** 
 * @description exporta arreglo de componentes del módulo
 * @return Array<any>
*/
export const CoreComponents = [
    MessageComponent,
    UserComponents,
    MenuComponents,
    RoleComponents,
    
]
/**
 * @description Importa modules
 * Agrega proveedor MessageService
 */
@NgModule({
    imports: [
        MenuModule,
        UserModule,
        SessionModule,
        RoleModule,
        SuburbModule,
        FileModule,
        BoxModule,
    ],
    providers: [
        {
            provide: MessageService,
            useClass: MessageServiceAdapter
        }
    ]
})
export class CoreModule { }
