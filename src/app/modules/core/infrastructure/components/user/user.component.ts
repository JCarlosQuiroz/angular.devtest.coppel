import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInteractor } from '../../../domain/ports/in/user.interactor';
import { User } from '../../../domain/models/User';
import { Status } from '../../../domain/models/Status';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserStatus } from '../../../domain/models/statuses/user.status';
import { MessageService } from '../../../domain/ports/out/message.service';
import { Role } from '../../../domain/models/Role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  userList!: MatTableDataSource<User>;
  displayedColumns: string[] = ['idUser', 'userName', 'person', 'roleName', 'status', 'actions'];
  user!: User;
  statuses!: Status[];
  nameFilter!: string;
  userStatus!: typeof UserStatus;

  // Variables para filtro
  username: string = "";
  firstName: string = "";
  secondName: string = "";
  lastName: string = "";
  secondLastName: string = "";
  idStatus: string = "";
  idMenu!: number;
  dataSource: any;

  // lista para filtro
  statusList: UserStatus[] = [];


  constructor(
    private userInteractor: UserInteractor,
    private message: MessageService,
    private paginator: MatPaginator,
    private sort: MatSort
  ) { this.userStatus = UserStatus;}
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter();
    }
  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  ngOnInit(): void {
    this.getUser();
    this.getUsersWithParams();
    // para filtro
    this.getStatusListForFilter();
  }

  getUser() {
    this.userInteractor.getUserSession().subscribe(user => {
      this.user = user;
    });
  }

  // getAllUsers(){
  //     this.userInteractor.getUsers('', '', '').then( userList=>{
  //         userList.sort( (a, b) => a.idUser < b.idUser ? -1 : 0 );
  //         this.userList = new MatTableDataSource<User>(userList);

  //         this.userList.paginator = this.paginator;
  //         this.userList.paginator._intl.itemsPerPageLabel = 'Registros por página';
  //         this.userList.sort = this.sort;
  //     }).catch(res => res);
  // }

  getUsersWithParams() {
    this.validateParams();
    this.userInteractor.getUsersWithParams(
      this.username, this.firstName, this.secondName, this.lastName, this.secondLastName, this.idStatus
    ).then(userList => {
      userList.sort((a, b) => a.idUser < b.idUser ? -1 : 0);
      this.userList = new MatTableDataSource<User>(userList);

      this.userList.paginator = this.paginator;
      // this.userList.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.userList.sort = this.sort;
    }).catch(res => res);
  }

  // applyFilter(event: Event) {
  //     const filterValue = (event.target as HTMLInputElement).value;
  //     this.userList.filter = filterValue.trim().toLowerCase();
  // }

  applyFilter() {
    this.getUsersWithParams();
  }
  cleanFilters() {
    this.username = "";
    this.firstName = "";
    this.secondName = "";
    this.lastName = "";
    this.secondLastName = "";
    this.idStatus = "";

    this.getUsersWithParams();
  }
  validateParams() {
    if (this.idStatus == "0") {
      this.idStatus = "";
    }
  }
  getStatusListForFilter() {
    this.statuses = UserStatus.toArray();
  }

  getStatuses() {
    this.statuses = UserStatus.toArray();
  }

  getStatusName(status: number) {
    return UserStatus.getStatusName(status);
  }

  MessageDelete() {
    this.message.dialog('warning', { title: 'Usuario eliminado', message: 'Contacte a soporte tecnico si desea habilitarlo de nuevo' });
  }

  getRolesFromUser(roles: Role[]) {
    let rolesName: string = '';

    if (roles.length == 0) {
      rolesName = "Sin Rol";
      return rolesName;
    }

    roles.sort((a, b) => a.roleName < b.roleName ? -1 : 0);

    for (let i = 0; i < roles.length; i++) {

      if (i == roles.length - 1) {
        rolesName += roles[i].roleName;
      }
      else {
        rolesName += roles[i].roleName + ', ';
      }
    }

    return rolesName;
  }

}
