import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserResponse, UsersSelectResponse } from "../../../domain/models/response/UserResponse";
import { User } from "../../../domain/models/User";
import { SessionInteractor } from "../../../domain/ports/in/session.interactor";
import { UserService } from "../../../domain/ports/out/user.service";
import formatter from "src/app/utils/Formatter";

@Injectable({ providedIn: 'root' })
export class UserServiceAdapter implements UserService {
    private url: string = environment.api;
    private currentUserSubject!: BehaviorSubject<User>;
    private currentUser!: Observable<User>;

    /**
     * 
     * @param http 
     */
    constructor(
        private http: HttpClient,
        private sessionInteractor: SessionInteractor,
        private route: Router,
    ) { }

    /**
     * 
     * @param userName 
     * @param password 
     * @returns 
     */
    async getUserLogin(userName: string, password: string): Promise<UserResponse> {

        const user: User = {
            idUser: null!,
            userName: userName,
            password: password,
            code: null!,
            email: null!,
            lastLogin: null!,
            status: null!,
            isCorporate: null!,
            person: null!,
            roles: null!,
            expiredAt: null!,
        };

        return this.http.post<UserResponse>(`${this.url}/users/login`, user).toPromise().catch(res => res);
    }
    /**
     * @param userName 
     * @returns 
     */
    async refreshToken(userName: string): Promise<UserResponse> {
        return this.http.get<UserResponse>(`${this.url}/users/refreshToken/${userName}`).toPromise().catch(res => { this.endSession(); return res; });
    }

    async getUsers(userName: string, name: string, idStatus: number | ''): Promise<UserResponse> {
        let userList: UserResponse;
        userList = await this.http.get<UserResponse>(`${this.url}/users?userName=${userName}&name=${name}&idStatus=${idStatus}`)
            .toPromise()
            .catch(err => err);

        return userList;
    }

    async getUsersWithParams(userName: string, firstName: string, secondName: string, lastName: string, secondLastName: string, idStatus: string): Promise<UserResponse> {
        const path = formatter.toQueryParams({
            userName: userName || '',
            firstName: firstName || '',
            secondName: secondName || '',
            lastName: lastName || '',
            secondLastName: secondLastName || '',
            idStatus: idStatus || ''
        });
        let userList: UserResponse;
        userList = await this.http.get<UserResponse>(`${this.url}/users/withParams${path}`)
            .toPromise()
            .catch(err => err);

        return userList;
    }

    async saveUser(user: User): Promise<UserResponse> {
        return await this.http
            .post<UserResponse>(`${this.url}/users`, user)
            .toPromise()
            .catch(err => err);
    }

    async getUserById(idUser: number) {
        return await this.http
            .get<UserResponse>(`${this.url}/users/${idUser}`)
            .toPromise()
            .catch(err => err);
    }

    getAll(userName: string, name: string, status: number) {
        return this.http.get<UserResponse>(`${this.url}/users?userName=${userName ? userName : ''}&name=${name ? name : ''}&status=${status ? status : ''}`).toPromise().catch(res => res);
    }

    async getUsersWithoutBranch(idBranch: number) {
        return await this.http
            .get<UsersSelectResponse>(`${this.url}/users/usersWithoutBranch?idBranch=${idBranch}`)
            .toPromise()
            .catch(err => err);
    }

    endSession(): void {
        window.location.reload();
        this.sessionInteractor.destroyAll();
        this.currentUserSubject.next(this.sessionInteractor.get('current'));
        this.route.navigate(['/login']);
    }

}