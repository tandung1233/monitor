import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class CameraMonitorService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/devices';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  getListCamera(name): any {
    return this.http
      .get(`${this.url}/${name}/cameras`)
      .pipe(catchError(err => this.handleError(err)));
  }

  postListCamera(name, data): any {
    return this.http
      .post(`${this.url}/${name}/cameras`, data)
      .pipe(catchError(err => this.handleError(err)));
  }
  
  deleteCamera(name, id): any {
    return this.http
      .delete(`${this.url}/${name}/cameras/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

}
