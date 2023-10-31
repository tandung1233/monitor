import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class DeviceService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/devices?time=300';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  get(data?: any): any {
    if (data) { this.paramsGet = data; }
    if (this.paramsGet.filter) {
      const extendUrl = JSON.parse(this.paramsGet.filter);
      return this.http
        .get(this.url + (extendUrl?.filter ? '&' + extendUrl.filter : ''), )
        .pipe(catchError(err => this.handleError(err)));
    }
  }
}
