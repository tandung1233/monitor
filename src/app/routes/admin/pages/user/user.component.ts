import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {NzMessageService} from 'ng-zorro-antd/message';

import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';
import {Auth} from '@routes/auth/auth.model';
import {AuthService} from '@services/auth';

import {columnsUser} from '@columns/user';
import {UserService} from '@services/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UserService]
})
export class UserComponent extends ComponentExtend implements OnInit, OnDestroy {
  private subUser: Subscription;
  user: Auth;

  constructor(
    protected translate: TranslateService,
    protected service: UserService,
    protected message: NzMessageService,
    protected route: ActivatedRoute,
    protected adminService: AdminService,
    private authService: AuthService,
    private router: Router,
  ) {
    super(route, adminService, message, service);
  }

  ngOnInit(): void {
    super.onInit();
    this.subUser = this.authService.user.subscribe(v => {
      this.user = v;
      this.listOfColumns = columnsUser(this);
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }

  handleChangeLock(item): void {
    if (!item.isLocked) {
      this.service
        .PutUserLock(item.id)
        .subscribe(res => this.success(res.message));
    } else {
      this.service
        .PutUserUnlock(item.id)
        .subscribe(res => this.success(res.message));
    }
  }

  handleChangeActive(item): void {
    this.service
      .PutUserActive(item.id)
      .subscribe(res => this.success(res.message));
  }
}
