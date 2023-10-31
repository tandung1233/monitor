import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class UserService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/users';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  PutUserLock(id: any): any {
    return this.http
      .put(this.url + '/' + id + '/lock', {})
      .pipe(catchError(err => this.handleError(err)));
  }

  PutUserUnlock(id: any): any {
    return this.http
      .put(this.url + '/' + id + '/unlock', {})
      .pipe(catchError(err => this.handleError(err)));
  }

  PutUserActive(id: any): any {
    return this.http
      .put(this.url + '/' + id + '/active', {})
      .pipe(catchError(err => this.handleError(err)));
  }
}
