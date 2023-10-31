import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';
import {UserService} from '@services/user';
import {Auth} from '@routes/auth/auth.model';
import {AuthService} from '@services/auth';

import {columns, columnsUser} from '@columns/permission';
import {PermissionService} from '@services/permission';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [PermissionService, UserService]
})
export class PermissionComponent extends ComponentExtend implements OnInit, OnDestroy {
  private subUser: Subscription;
  user: Auth;

  searchChange$ = new BehaviorSubject('');
  userList = [];
  userId?: string;
  userName?: string;

  columnPermission = [];
  listPermission = [];
  totalPermission = 0;

  constructor(
    protected translate: TranslateService,
    protected service: PermissionService,
    protected serviceUser: UserService,
    protected message: NzMessageService,
    protected route: ActivatedRoute,
    protected adminService: AdminService,
    private authService: AuthService,
  ) {
    super(route, adminService, message, service);
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  ngOnInit(): void {
    super.onInit();
    this.subUser = this.authService.user.subscribe(v => {
      this.user = v;
      this.listOfColumns = columnsUser(this);
      this.columnPermission = columns(this);
    });
    this.searchChange$
      .asObservable().subscribe(value => {
        this.serviceUser.get({filter: JSON.stringify({fullTextSearch: value}), size: 8}).subscribe(({data}) => {
          this.userList = data.content;
          this.isLoading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }

  handleGetDevice(value): void {
    this.userId = value;
    this.onChangePermission(null);
  }

  onChangePermission(data): void {
    this.isLoading = true;
    this.listOfData.map((item) => {
      if (item.id === this.userId) {
        this.userName = item.name;
      }
    });
    this.userList.map((item) => {
      if (item.id === this.userId) {
        this.userName = item.name;
      }
    });
    this.service.GetPermission(data, this.userId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.listPermission = res.data.content;
        this.totalPermission = res.data.totalElements;
      });
  }

  handleChangePermission(permission, data): void {
    if (data.permission.split('').indexOf(permission) === -1) {
      this.service.PostPermission(this.userId, data.deviceId, permission).subscribe((res) => {
        this.onChangePermission(null);
      });
    } else {
      this.service.DeletePermission(this.userId, data.deviceId, permission).subscribe((res) => {
        this.onChangePermission(null);
      });
    }
  }
}
