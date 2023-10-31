import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';
import {Auth} from '@routes/auth/auth.model';

import {GroupService} from '@services/device/group';
import {columns} from '@columns/device/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [GroupService]
})
export class GroupComponent extends ComponentExtend implements OnInit, OnDestroy {
  user: Auth;

  scene = {
    type: 'container',
    props: {
      orientation: 'horizontal'
    },
    children: []
  };
  indexGroup = 0;
  constructor(
    protected translate: TranslateService,
    protected service: GroupService,
    protected message: NzMessageService,
    protected route: ActivatedRoute,
    protected adminService: AdminService,
    private router: Router,
  ) {
    super(route, adminService, message, service);
  }

  ngOnInit(): void {
    super.onInit();
    super.onInit();
    document.querySelectorAll('.ant-layout').forEach((element) => {
      element.classList.remove('not-bg');
    });
    this.service.get()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((ress) => {
        this.listOfColumns = columns(this);
        this.scene.children = new Array(ress.data.length);
        ress.data.map((item, index) => {
          this.service.getDevices(item.id).subscribe(res => {
            this.scene.children[index] = {
              id: item.id,
              type: 'container',
              data: item,
              children: res.data.map(subItem => ({
                type: 'draggable',
                id: subItem.id,
                data: subItem
              }))
            };
          });
        });
      });
  }


  ngOnDestroy(): void {
    document.querySelectorAll('.ant-layout').forEach((element) => {
      element.classList.add('not-bg');
    });
  }


  applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) {
      return arr;
    }

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  }

  onColumnDrop(dropResult): void {
    const scene = Object.assign({}, this.scene);
    scene.children = this.applyDrag(scene.children, dropResult);
    this.service.updateOrder(scene.children.map((item, index) => ({groupId: item.id, order: index}))).subscribe();
    this.scene = scene;
  }
  onCardDrop(columnId, dropResult): void {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = this.applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
      this.service.putDeviceToGroup(columnId, dropResult.payload.id).subscribe(() => {
        this.scene = scene;
      });
    }
  }
  getCardPayload(columnId): any {
    return (index) => this.scene.children.filter(p => p.id === columnId)[0].children[index];
  }
  log(...params): void {
    console.log(...params);
  }

  goToDetailMonitor(param): void {
    this.router.navigate(['./d'], { queryParams: {name: param.name} });
  }

  handleEditGroup(item, index): void  {
    super.handleEdit(item);
    this.indexGroup = index;
  }

  handleOkGroup(validateForm): void {
    if (validateForm.status === 'VALID') {
      this.isLoading = true;
      if (!!this.data?.id) {
        this.service.put(validateForm.value, this.data.id)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(res => {
            this.success(res.message);
            this.scene.children[this.indexGroup] = {...this.scene.children[this.indexGroup], ...validateForm.value};
            setTimeout(() => {
              document.getElementById('group-' + this.data?.id).innerHTML = validateForm.value['groupName'];
            });
          });
      } else {
        this.service.post(validateForm.value)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(res => {
            this.success(res.message);
            setTimeout(() => {
              window.location.reload();
            });
          });
      }
    }
  }
}
