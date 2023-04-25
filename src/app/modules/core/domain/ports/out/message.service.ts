import { TypeMessage } from "../../models/TypeMessage";

export abstract class MessageService {
    /**
     *
     * @param type
     * @param data
     * @return Promise<boolean>
     */
    abstract dialog(type: string, data: TypeMessage): Promise<boolean>;
    /**
     *
     * @param type
     * @param data
     * @return Promise<boolean>
     */
    abstract confirm(type: string, data: TypeMessage): Promise<boolean>;
    /**
     *
     * @param type
     * @param data
     * @return Promise<string>
     */
    abstract prompt(type: string, data: TypeMessage): Promise<string>;
}
