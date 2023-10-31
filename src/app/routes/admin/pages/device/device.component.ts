import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';
import {Auth} from '@routes/auth/auth.model';
import {AuthService} from '@services/auth';

import {DeviceService} from '@services/device';
import {columns} from '@columns/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DeviceService]
})
export class DeviceComponent extends ComponentExtend implements OnInit {
  user: Auth;
  @ViewChild('myTable') myTable;
  listOfColumns;

  listFilter = [
    { name: 'Live', value: 'status=1' },
    { name: 'Dead', value: 'status=0' },
    { name: 'Sleep', value: 'status=2' },
  ];
  filter = {
    filter: null
  };


  constructor(
    protected translate: TranslateService,
    protected service: DeviceService,
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
  }

  onChange(data): void {
    this.isLoading = true;
    if (data.filter) {
      this.filter.filter = JSON.parse(data.filter).filter;
    }
    this.service.get(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.listOfData = res;
        this.listOfColumns = columns(this);
    });
  }

  handleChangeType(value, name): void {
    if (this.filter[name] !== value) {
      this.filter[name] = value;
      this.myTable.filter(name, null, value);
    } else {
      this.myTable.resetFilter(null, name);
      this.filter[name] = null;
    }
  }

  goToDetailMonitor(param): void {
    this.router.navigate(['./d', param.name]);
  }
}
