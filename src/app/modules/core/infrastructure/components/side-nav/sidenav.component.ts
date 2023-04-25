import { EventEmitter, ViewChild } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Menu } from "../../../domain/models/Menu";
import { MenuStatus } from "../../../domain/models/statuses/menu.status";
import { MenuInteractor } from "../../../domain/ports/in/menu.interactor";
import { UserInteractor } from "../../../domain/ports/in/user.interactor";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SideNavComponent implements OnInit {
  // @ViewChild(MatSort) sort: MatSort;
  @Output() showHide = new EventEmitter();
  menuList: Menu[] = [];

  formGroup!: FormGroup;

  filteredOptions!: Observable<Menu[]>;
  idMenu!: number;
  dataSource: any;
  /**
   *
   * @param menuInteractor
   */
  constructor(
    private menuInteractor: MenuInteractor,
    private userInteractor: UserInteractor,
    private paginator: MatPaginator,
    private sort: MatSort
  ) {

  }
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
    this.formGroup = new FormGroup({
      filter: new FormControl('')
    });

    this.getMenus();
  }

  /**
   * @description
   * - Obtiene los menus padres y menus
   * - obtiene los roles asignados y crea array de los menus asignados a los roles sin repetir
   * - Crea array con los parents y submenus validando que el rol del usuario lo tenga agregado
   * - Inicialia el filtro
   */
  async getMenus() {
    const parents: Menu[] = await this.menuInteractor.getParents('', MenuStatus.ENABLE).finally().catch(err => err);
    const menus: Menu[] = await this.menuInteractor.getMenus('', MenuStatus.ENABLE).finally().catch(err => err);

    // parents.sort( (a, b) => a.menuName < b.menuName ? -1 : 0 );
    // menus.sort( (a, b) => a.menuName < b.menuName ? -1 : 0 );
    parents.sort((a, b) => a.idMenu - b.idMenu);
    menus.sort((a, b) => a.idMenu - b.idMenu);

    const menuList: Menu[] = [];

    this.userInteractor.getUserSession().subscribe(user => {
      const userMenus: Menu[] = [];
      user.roles.map(role => {
        role.roleMenus.map(roleMenu => {
          const menu = roleMenu.menu;

          if (!userMenus.some(userMenu => userMenu.idMenu == menu.idMenu)) {
            userMenus.push(menu);
          }
        });
      });
      parents.sort((a, b) => {
        if (a.idMenu < b.idMenu) {
          return -1;
        }

        return 0;
      });
      parents.map(parent => {
        this.setMenus(parent, menus, userMenus);
        if (parent.submenu!.length || userMenus.some(userMenu => userMenu.idMenu == parent.idMenu)) {
          menuList.push(parent);
        }
      });
      this.menuList = menuList;

      this.filteredOptions = this.formGroup.controls["filter"].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    this.menuList.sort((a, b) => a.menuName < b.menuName ? -1 : 0);

  }
  /**
   * @param parent
   * @param menus
   * @param userMenus
   * @description Agrega los submenus a los menus padres validando que el menu este dentro de los permisos del rol
   */
  setMenus(parent: Menu, menus: Menu[], userMenus: Menu[]) {
    parent.submenu = [];

    menus.forEach((menu, key) => {
      if (menu.parent && menu.parent.idMenu == parent.idMenu) {

        this.setMenus(menu, menus, userMenus);
        if (menu.submenu!.length || userMenus.some(userMenu => userMenu.idMenu == menu.idMenu)) {
          parent.submenu!.push(menu);
        }
      }

    });
  }

  /**
   *
   * @param value
   * @description filtrado para buscar por descripcion de menú
   * @returns
   */
  private _filter(value: string): Menu[] {
    const filterValue = value.toLowerCase();
    let _menuList = [...this.menuList];
    let menuList: Menu[] = [];
    if (value.length) {
      _menuList.forEach(parent => {
        let _parent = { ...parent };
        if (_parent.submenu!.length) {
          let submenuList: Menu[] | undefined = [];
          _parent.submenu!.forEach(menu => {

            let _submenuList: Menu[] | undefined = [];
            let _menu = { ...menu };

            if (_menu.submenu!.length) {
              _menu.submenu!.map(res => {
                let include = res.menuName.toLowerCase().includes(filterValue);
                if (include) {
                  _menu.isCollapsed = true;
                  _submenuList!.push(res);
                }
              });

            }
            _menu.submenu = _submenuList;
            if (!_submenuList.length) {
              _menu.isCollapsed = false;
            }

            let include = _menu.menuName.toLowerCase().includes(filterValue);
            if (include || _menu.submenu.length) {
              _parent.isCollapsed = true;
              submenuList!.push(_menu);
            }
          });
          if (submenuList.length) {
            _parent.submenu = submenuList;
            menuList.push(_parent);
          } else {
            _parent.isCollapsed = false;
          }
        } else {
          let include = _parent.menuName.toLowerCase().includes(filterValue);
          if (include) {
            menuList.push(_parent)
          }
        }
      })
    } else {
      _menuList.map(parent => {
        parent.isCollapsed = false;
      })
      menuList = _menuList;
    }

    return menuList;

  }

}
