import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ActionMenu } from "../../../domain/models/ActionMenu";
import { UserResponse, UsersSelectResponse } from "../../../domain/models/response/UserResponse";
import { User, UsersSelect } from "../../../domain/models/User";
import { SessionInteractor } from "../../../domain/ports/in/session.interactor";
import { UserInteractor } from "../../../domain/ports/in/user.interactor";
import { MessageService } from "../../../domain/ports/out/message.service";
import { UserService } from "../../../domain/ports/out/user.service";
import { Location } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class UserInteractorAdapter implements UserInteractor {
  private title: string = 'Usuarios'
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  /**
   *
   * @param userService
   * @param messageService
   * @param sessionInteractor

   */
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private sessionInteractor: SessionInteractor,
    private route: Router,
    private location: Location,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(sessionInteractor.get('current'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   *
   * @param userName
   * @param password
   * @returns
   */
  // startSession(userName: string, password: string): void {
  //     let userList: User[];

  //     this.userService.getUserLogin(userName, password).then(userResponse => {

  //         if (userResponse.statusText == 'OK') {
  //             if (!userResponse.data.length) {
  //                 this.messageService.dialog('warning', { title: this.title, message: 'Datos incorrectos' });
  //                 return false;
  //             }
  //             this.login(userResponse.data[0]);
  //             userList = userResponse.data;
  //         } else {
  //             this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
  //         }
  //     }).catch(err => {
  //         this.messageService.dialog('warning', { title: this.title, message: err });
  //     });

  // }
  startSession(userName: string, password: string): void {
    let userList: User[];

    this.userService.getUserLogin(userName, password).then(userResponse => {
      if (userResponse.statusText == 'OK') {
        if (!userResponse.data.length) {
          this.messageService.dialog('warning', { title: this.title, message: 'Datos incorrectos' });
          return false;
        }
        this.login(userResponse.data[0]);
        userList = userResponse.data;
      } else {
        this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
        return false;
      }
      return true;
    }).catch(err => {
      this.messageService.dialog('warning', { title: this.title, message: err });
      return false;
    });
    return; // o cualquier valor que desees devolver en caso de que el código anterior no se ejecute
  }

  /**
   *
   * @returns
   */
  getUserSession(): Observable<User> {
    return this.currentUser;
  }

  /**
   *
   * @param user
   */
  private login(user: User): void {
    user.startAt = new Date();
    this.sessionInteractor.set('current', user);
    this.currentUserSubject.next(this.sessionInteractor.get('current'));
    this.route.navigate(['/']);
  }

  /**
   */
  endSession(): void {
    this.sessionInteractor.destroyAll();
    this.currentUserSubject.next(this.sessionInteractor.get('current'));
    this.route.navigate(['/login']);
  }

  /**
   *
   * @param userName
   */
  refreshSession(userName: string): void {
    this.userService.refreshToken(userName).then(userResponse => {
      if (userResponse.statusText == 'OK') {
        const user: User = userResponse.data[0];
        user.startAt = new Date();
        this.sessionInteractor.set('current', user);
      } else {
        this.endSession();
      }
    });
  };


  /**
   * @param userName
   * @param idPerson
   * @param name
   * @param idStatus
   * @returns
   */
  async getUsers(userName: string, name: string, idStatus: number | ''): Promise<User[]> {
    let userList: User[];
    let userResponse: UserResponse;

    userResponse = await this.userService.getUsers(userName, name, idStatus).finally().catch(res => res);

    if (userResponse.statusText == "OK") {
      userList = userResponse.data;
    } else {
      this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
      return Promise.reject(userResponse.message);
    }
    return userList;
  }

  async getUsersWithParams(userName: string, firstName: string, secondName: string, lastName: string, secondLastName: string, idStatus: string): Promise<User[]> {
    let userList: User[];
    let userResponse: UserResponse;

    userResponse = await this.userService.getUsersWithParams(
      userName, firstName, secondName, lastName, secondLastName, idStatus
    ).finally().catch(res => res);

    if (userResponse.statusText == "OK") {
      userList = userResponse.data;
    } else {
      this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
      return Promise.reject(userResponse.message);
    }
    return userList;
  }

  async saveUser(user: User): Promise<User> {
    let userResponse: UserResponse;

    userResponse = await this.userService.saveUser(user).finally();
    if (userResponse.statusText == "OK") {
      user = userResponse.data[0];
      this.messageService.dialog('success', { title: this.title, message: userResponse.message }).then(res => {
        this.location.back();
      });
    } else {
      this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
      return Promise.reject(userResponse.message);
    }
    return user;
  }

  async getUserById(idUser: number): Promise<User> {
    let user: User;
    let userResponse: UserResponse;

    userResponse = await this.userService.getUserById(idUser).finally().catch(res => res);

    if (userResponse.statusText == "OK") {
      user = userResponse.data[0];
    } else {
      this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
      return Promise.reject(userResponse.message);
    }

    return user;
  }

  async getAll(userName: string, name: string, status: number): Promise<User[]> {
    const userResponse: UserResponse = await this.userService.getAll(userName, name, status);
    if (userResponse.statusText == 'OK') {
      return userResponse.data;
    } else {
      this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
      return Promise.reject(userResponse.message);
    }
  }

  getPermissions(): ActionMenu[] {
    let url: String = "";

    if (this.route.url.split('/').length == 2) {
      url = this.route.url.split('/')[1];
    }
    else {
      if (this.route.url.split('/')[2] == "add" || this.route.url.split('/')[2] == "schedule") {
        url = this.route.url.split('/')[1];
      }
      else {
        url = this.route.url.split('/')[1] + "/" + this.route.url.split('/')[2];
      }
    }

    let actionMenus: ActionMenu[] = [];
    let user: User = this.sessionInteractor.get('current');
    user.roles.map(rol => {
      rol.roleMenus.map(roleMenu => {
        if (roleMenu.menu.url == url) {
          actionMenus = roleMenu.actionMenus;
        }
      })
    });

    return actionMenus;
  }

  havePermission(permission: String): boolean {
    const actionMenus = this.getPermissions();

    let havePermission: boolean = false;
    actionMenus.map(actionMenu => {
      if (actionMenu.actionMenuName == permission) {
        havePermission = true;
      }
    });
    return havePermission;
  }

  async getUsersWithoutBranch(idBranch: number): Promise<UsersSelect[]> {
    const userResponse: UsersSelectResponse = await this.userService.getUsersWithoutBranch(idBranch);
    if (userResponse.statusText == 'OK') {
      return userResponse.data;
    } else {
      this.messageService.dialog('warning', { title: this.title, message: userResponse.message });
      return Promise.reject(userResponse.message);
    }
  }

}
