import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class PermissionService extends ServiceExtend{
  url = environment.adminApiUrl + '/api/users';
  paramsGetPermission: any;

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  GetPermission(data?: any, userId?: string): any {
    if (data) { this.paramsGetPermission = data; }
    let params = new HttpParams();
    for (const key in this.paramsGetPermission) {
      if (this.paramsGetPermission.hasOwnProperty(key)) { params = params.append(key, this.paramsGetPermission[key]); }
    }
    return this.http
      .get(this.url + '/' + userId + '/device', { params })
      .pipe(catchError(err => this.handleError(err)));
  }

  PostPermission(userId: string, deviceId: string, permission: string): any {
    return this.http
      .post(this.url + '/' + userId + '/device/' + deviceId + '/permissions/' + permission, { })
      .pipe(catchError(err => this.handleError(err)));
  }
  DeletePermission(userId: string, deviceId: string, permission: string): any {
    return this.http
      .delete(this.url + '/' + userId + '/device/' + deviceId + '/permissions/' + permission, { })
      .pipe(catchError(err => this.handleError(err)));
  }
}
