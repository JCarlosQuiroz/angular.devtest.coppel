import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Menu } from "../../../domain/models/Menu";
import { Status } from "../../../domain/models/Status";
import { MenuStatus } from "../../../domain/models/statuses/menu.status";
import { MenuInteractor } from "../../../domain/ports/in/menu.interactor";

@Component({
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  // @ViewChild(MatSort)
  // sort!: MatSort;
  menuList!: MatTableDataSource<Menu>;
  displayedColumns: string[] = ['idMenu', 'menuName', 'parent', 'url', 'status', 'actions'];
  menuName: string = "";
  idStatus: number = null!;
  statuses!: Status[];
  // menuStatus: MenuStatus = MenuStatus;
  menuStatus: typeof MenuStatus;

  idMenu!: number;
  dataSource: any;

  /**
   *
   * @param menuInteractor
   * @param route
   * @param location
   */
  constructor(
    private menuInteractor: MenuInteractor,
    private route: ActivatedRoute,
    private location: Location,
    private paginator: MatPaginator,
    private sort: MatSort

  ) { this.menuStatus = MenuStatus; }
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
    this.getStatuses();
    this.route.params.subscribe(res => {
      this.idMenu = res["idMenu"];
      this.getData();
    });
  }

  /**
   */
  getData() {
    if (this.idMenu) {
      this.getMenus(this.idMenu);
    } else {
      this.getParents();
    }
  }

  /**
   *
   * @param idMenu
   */
  getMenus(idMenu: number) {
    this.menuInteractor.getMenusByIdParent(idMenu, this.menuName, this.idStatus)
      .then(menuList => {
        menuList.sort((a, b) => a.idMenu < b.idMenu ? -1 : 0);
        this.menuList = new MatTableDataSource<Menu>(menuList);
        // this.menuList.sort = this.sort;
        this.menuList.paginator = this.paginator;
        // this.menuList.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.menuList.paginator.length = 0;
        this.menuList.sort = this.sort;

      }).catch(res => res);
  }

  /**
   */
  getParents() {
    this.menuInteractor.getParents(this.menuName, this.idStatus)
      .then(menuList => {
        menuList.sort((a, b) => a.idMenu < b.idMenu ? -1 : 0);
        this.menuList = new MatTableDataSource<Menu>(menuList);

        this.menuList.paginator = this.paginator;
        this.menuList.paginator.length = 0;
        // this.menuList.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.menuList.sort = this.sort;

      }).catch(res => res);
  }

  /**
   */
  getStatuses() {
    this.statuses = MenuStatus.toArray();
  }

  /**
   *
   * @param status
   * @returns
   */
  getStatusName(status: number) {
    return MenuStatus.getStatusName(status);
  }

  /**
   *
   * @param menu
   */
  disableMenu(menu: Menu) {
    if (menu.status == MenuStatus.ENABLE) {
      this.menuInteractor.disableMenu(menu)
        .then(res => {
          this.getData();
        }).catch(res => res);
    }
  }

  /**
   *
   * @param menu
   */
  enableMenu(menu: Menu) {
    if (menu.status == MenuStatus.DISABLE) {
      this.menuInteractor.enableMenu(menu)
        .then(res => {
          this.getData();
        }).catch(res => res);
    }
  }

  /**
   *
   * @param menu
   */
  delete(menu: Menu) {
    this.menuInteractor.deleteMenu(menu)
      .then(res => {
        this.getData();
      }).catch(res => res);
  }

  /**
   */
  cleanFilters() {
    this.menuName = "";
    this.idStatus = null!;
  }

  /**
   */
  back() {
    this.location.back();
  }
}
