import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class DetailMonitorService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/devices';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  get(name): any {
    return this.http
      .get(this.url + '/' + name)
      .pipe(catchError(err => this.handleError(err)));
  }

  getLog(name, size): any {
    return this.http
      .get(`${this.url}/${name}/log?size=${size}`)
      .pipe(catchError(err => this.handleError(err)));
  }
  getCommand(name): any {
    return this.http
      .get(this.url + '/' + name + '/commands')
      .pipe(catchError(err => this.handleError(err)));
  }
  postCommand(data, deviceId): any {
    return this.http
      .post(this.url + '/' + deviceId + '/commands', data)
      .pipe(catchError(err => this.handleError(err)));
  }
  postCommandCheck(deviceId): any {
    return this.http
      .post(this.url + '/' + deviceId + '/command/check', {})
      .pipe(catchError(err => this.handleError(err)));
  }
  deleteCommand(data, deviceId): any {
    return this.http
      .delete(this.url + '/' + deviceId + '/commands/' + data.id, data)
      .pipe(catchError(err => this.handleError(err)));
  }
  getConfig(name): any {
    return this.http
      .get(this.url + '/' + name + '/config')
      .pipe(catchError(err => this.handleError(err)));
  }
  postConfig(data, deviceId): any {
    return this.http
      .post(this.url + '/' + deviceId + '/config', data)
      .pipe(catchError(err => this.handleError(err)));
  }
  getMetadata(name): any {
    return this.http
      .get(this.url + '/' + name + '/metadata')
      .pipe(catchError(err => this.handleError(err)));
  }
  postMetadata(data, deviceId): any {
    return this.http
      .post(this.url + '/' + deviceId + '/metadata', data)
      .pipe(catchError(err => this.handleError(err)));
  }
  getError(name): any {
    return this.http
      .get(`${this.url}/${name}/errors`)
      .pipe(catchError(err => this.handleError(err)));
  }
  deleteError(name): any {
    return this.http
      .delete(`${this.url}/${name}/errors/`)
      .pipe(catchError(err => this.handleError(err)));
  }
  getImage(name): any {
    return this.http
      .get(`${this.url}/${name}/images`)
      .pipe(catchError(err => this.handleError(err)));
  }
  getTimeSeries(name, count): any {
    return this.http
      .get(`${this.url}/${name}/time-series/battery`, {params: {count}})
      .pipe(catchError(err => this.handleError(err)));
  }
}
