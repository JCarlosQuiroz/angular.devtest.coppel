import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Menu } from "../../../domain/models/Menu";
import { MenuInteractor } from "../../../domain/ports/in/menu.interactor";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddActionMenuComponent } from './actionMenu/add-actionMenu.component';
import { ActivatedRoute } from "@angular/router";
import { ActionMenu } from "../../../domain/models/ActionMenu";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { MenuStatus } from "../../../domain/models/statuses/menu.status";

@Component({
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})

export class AddMenuComponent implements OnInit {
  menuForm!: FormGroup;
  menu!: Menu;
  parents: Menu[] = [];
  actionMenuList: ActionMenu[] = [];
  displayedColumns: string[] = ['actionMenuName', 'actions'];
  // statuses: MenuStatus = new MenuStatus();
  idMenu!: number;
  filteredOptions!: Observable<Menu[]>;
  statuses: typeof MenuStatus;

  /**
   *
   * @param formBuilder
   * @param menuInteractor
   * @param modal
   * @param route
   * @param location
   */
  constructor(
    private formBuilder: FormBuilder,
    private menuInteractor: MenuInteractor,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.createForm();
    this.statuses = MenuStatus;
  }

  /**
   * @description Inicializa el objeto menú y checa si recibe parametro para asignar valor
   */
  ngOnInit() {
    this.menu = {
      actionMenus: [],
      icon: null!,
      idAction: null!,
      idMenu: null!,
      menuName: null!,
      parent: null!,
      idMenuSection: 4,
      order: 1,
      status: MenuStatus.ENABLE,
      type: 1,
      url: null!
    }

    this.route.params.subscribe(res => {
      if (res["idMenu"]) {
        this.idMenu = res["idMenu"];
        this.menuInteractor.getMenuById(res["idMenu"]).then(menu => {
          this.menu = { ...menu };
          this.createForm();
        });
      }
    })
    this.getParents();


  }

  /**
   */
  createForm() {
    this.menuForm = this.formBuilder.group({
      idMenu: [this.menu ? this.menu.idMenu : null],
      menuName: [this.menu ? this.menu.menuName : null, [Validators.required, Validators.maxLength(100)]],
      parent: [this.menu ? this.menu.parent : null],
      icon: [this.menu ? this.menu.icon : null, [Validators.required, Validators.maxLength(45)]],
      url: [this.menu ? this.menu.url : null, Validators.maxLength(100)]
    });


  }

  /**
   *
   * @param value
   * @returns
   */
  private _filter(value: string | Menu): Menu[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.menuName.toLowerCase();
    return this.parents.filter(option => option.menuName.toLowerCase().includes(filterValue) || option.idMenu.toString() === filterValue);
  }



  /**
   *
   * @param menu
   * @returns
   */
  displayMenuName(menu: Menu) {
    return menu ? `${menu.idMenu} - ${menu.menuName}` : '';
  }

  /**
   */
  getParents() {
    this.parents = [];
    this.menuInteractor.getMenus("", MenuStatus.ENABLE)
      .then(res => {
        if (res) {
          res.sort((a, b) => a.idMenu < b.idMenu ? -1 : 0);
          this.parents = res;
          this.filteredOptions = this.menuForm.controls["parent"].valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        }
      });
  }

  /**
   */
  save() {
    if (this.menuForm.valid) {

      this.menu.menuName = this.menuForm.controls["menuName"].value;
      this.menu.parent = this.menuForm.controls["parent"].value;
      this.menu.icon = this.menuForm.controls["icon"].value;
      this.menu.url = this.menuForm.controls["url"].value;

      this.menuInteractor.save(this.menu)
        .then(res => {
          this.menu = { ...res };
        }).catch(err => err);
    }
  }

  /**
   */
  addActionMenu() {
    this.modalActionMenu();

  }

  /**
   *
   * @param actionMenu
   */
  editActionMenu(actionMenu: ActionMenu) {
    this.modalActionMenu(actionMenu);
  }

  /**
   *
   * @param actionMenu
   */
  private modalActionMenu(actionMenu?: ActionMenu) {
    const modal = this.modal.open(AddActionMenuComponent, { centered: true });
    modal.componentInstance.actionMenu = actionMenu;
    modal.result.then(resp => {
      if (resp) {
        if (actionMenu && actionMenu.idActionMenu) {
          this.menu.actionMenus.map(res => {
            if (res.idActionMenu == resp.idActionMenu) {
              res.actionMenuName = resp.actionMenuName;
            }
          });
        } else {
          this.menu.actionMenus.push(resp);
        }
        this.menu.actionMenus = [...this.menu.actionMenus];
      }
    });
  }

  /**
   *
   * @param action
   */
  deleteActionMenu(action: ActionMenu) {
    for (let index = 0; index < this.menu.actionMenus.length; index++) {
      if (this.menu.actionMenus[index].idActionMenu == action.idActionMenu) {
        this.menu.actionMenus.splice(index, 1);
      }
    }
    this.menu.actionMenus = [...this.menu.actionMenus];
  }

  /**
   */
  back() {
    this.location.back()
  }
}
