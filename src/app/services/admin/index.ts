import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {NzMessageService} from 'ng-zorro-antd/message';

import {HttpClient} from '@angular/common/http';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends ServiceExtend {
  collapsed$ = new BehaviorSubject(false);
  drawer$ = new BehaviorSubject(false);
  desktop$ = new BehaviorSubject(window.innerWidth > 767);
  link$ = new BehaviorSubject('');

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }
}
