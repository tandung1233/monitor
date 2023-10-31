import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable() 
export class ChartMonitorService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/devices';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  getTimeBattery(name, count): any {
    return this.http
      .get(`${this.url}/${name}/time-series/battery`, {params: {count}})
      .pipe(catchError(err => this.handleError(err)));
  }

  getTimeUploadSpeed(name, count): any {
    return this.http
      .get(`${this.url}/${name}/time-series/upload_speed`, {params: {count}})
      .pipe(catchError(err => this.handleError(err)));
  }

  getTimeTemperature(name, count): any {
    return this.http
      .get(`${this.url}/${name}/time-series/temperature`, {params: {count}})
      .pipe(catchError(err => this.handleError(err)));
  }

  getTimeHumidity(name, count): any {
    return this.http
      .get(`${this.url}/${name}/time-series/humidity`, {params: {count}})
      .pipe(catchError(err => this.handleError(err)));
  }
}
