import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class GroupService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/v1/devices-groups';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  getDevices(groupId, data = null): any {
    if (data) { this.paramsGet = data; }
    let params = new HttpParams();
    for (const key in this.paramsGet) {
      if (this.paramsGet.hasOwnProperty(key)) { params = params.append(key, this.paramsGet[key]); }
    }
    return this.http
      .get(this.url + '/' + groupId + '/device', { params })
      .pipe(catchError(err => this.handleError(err)));
  }

  updateOrder(data): any {
    return this.http
      .put(this.url + '/update-order', data)
      .pipe(catchError(err => this.handleError(err)));
  }

  putDeviceToGroup(groupId, deviceId): any {
    return this.http
      .put(`${this.url}/${groupId}/devices/${deviceId}`, {})
      .pipe(catchError(err => this.handleError(err)));
  }
}
