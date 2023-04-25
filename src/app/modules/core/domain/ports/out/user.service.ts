import { UserResponse, UsersSelectResponse } from "../../models/response/UserResponse";
import { User } from "../../models/User";

export abstract class UserService {
    /**
     * @param userName 
     * @param password     
     */
    abstract getUserLogin(userName: string, password: string): Promise<UserResponse>;
    /**
     * @param userName 
     */
    abstract refreshToken(userName: string): Promise<UserResponse>;

    abstract getUsers(userName: string, name: string, idStatus: number | ''): Promise<UserResponse>;

    abstract getUsersWithParams(userName: string, firstName: string, secondName: string, lastName: string, secondLastName: string, idStatus: string): Promise<UserResponse>;

    /**
     * @param user 
     */
    abstract saveUser(user: User): Promise<UserResponse>;

    /**
     * @param idUser 
     */
    abstract getUserById(idUser: number): Promise<UserResponse>;

    abstract getAll(userName: string, name: string, status: number): Promise<UserResponse>;

    abstract getUsersWithoutBranch(idBranch: number): Promise<UsersSelectResponse>;
}