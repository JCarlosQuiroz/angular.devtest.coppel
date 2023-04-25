import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Role } from "../../../domain/models/Role";
import { Status } from "../../../domain/models/Status";
import { RoleInteractor } from "../../../domain/ports/in/role.interactor";
import { RoleStatus } from '../../../domain/models/statuses/RoleStatus';
import { MatSort } from "@angular/material/sort";
@Component({
  templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  roles!: MatTableDataSource<Role>;
  roleName: string = "";
  idStatus: number = null!;
  displayedColumns: string[] = ['idRole', 'roleName', 'status', 'actions'];
  statuses!: Status[];
  // roleStatus: RoleStatus = RoleStatus;
  roleStatus: typeof RoleStatus;
  idMenu!: number;
  dataSource: any;
  constructor(
    private rolesInteractor: RoleInteractor,
    private paginator: MatPaginator,
    private sort: MatSort
  ) { this.roleStatus = RoleStatus }
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
      this.applyFilter('');
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  /**
   */
  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.rolesInteractor.getRoles(this.roleName, this.idStatus)
      .then(roles => {
        roles.sort((a, b) => a.idRole < b.idRole ? -1 : 0);
        this.roles = new MatTableDataSource<Role>(roles);
        this.roles.paginator = this.paginator;
        // this.roles.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.roles.paginator.length = 0;
      }).catch(res => res);
  }

  /**
   */
  getStatuses() {
    this.statuses = RoleStatus.toArray();
  }

  /**
   *
   * @param status
   * @returns
   */
  getStatusName(status: number) {
    return RoleStatus.getStatusName(status);
  }

  cleanFilters() { }
  /**
   * @param role
   */
  disableRole(role: Role) {
    this.rolesInteractor.disableRole(role).then(role => {
      this.getRoles();
    }).catch(res => res);
  }
  /**
   * @param role
   */
  enableRole(role: Role) {
    this.rolesInteractor.enableRole(role).then(role => {
      this.getRoles();
    }).catch(res => res);
  }
  /**
   * @param role
   */
  deleteRole(role: Role) {
    this.rolesInteractor.deleteRole(role).then(role => {
      this.getRoles();
    }).catch(res => res);
  }

}
