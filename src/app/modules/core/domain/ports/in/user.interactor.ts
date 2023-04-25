import { Observable } from "rxjs";
import { ActionMenu } from "../../models/ActionMenu";
import { User, UsersSelect } from "../../models/User";

export abstract class UserInteractor {
    /**
     * @param userName
     * @param password
     */
    abstract startSession(userName: string, password: string): void;
    /**
     */
    abstract endSession(): void;
    /**
     */
    abstract refreshSession(userName: string, password: string): void;
    /**
     */
    abstract getUserSession(): Observable<User>;

    /**
     * @param userName
     * @param idPerson
     * @param name
     * @param idStatus
     */
    abstract getUsers(userName: string, name: string, idStatus: number | ''): Promise<User[]>;

    /**
     * @param userName
     * @param firstName
     * @param secondName
     * @param lastName
     * @param secondLastName
     * @param idStatus
     */
    abstract getUsersWithParams(userName: string, firstName: string, secondName: string, lastName: string, secondLastName: string, idStatus: string): Promise<User[]>;

    /**
     * @param user
     */
    abstract saveUser(user: User): Promise<User>;

    /**
     * @param idUser
     */
    abstract getUserById(idUser: number): Promise<User>;

    abstract getAll(userName: string, name: string, status: number): Promise<User[]>;

    abstract getPermissions(): ActionMenu[];

    abstract havePermission(permission: String): boolean;

    abstract getUsersWithoutBranch(idBranch: number): Promise<UsersSelect[]>;

}
