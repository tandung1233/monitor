import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {environment} from '@src/environments/environment';
import {ServiceExtend} from '@extends/service';
import {AuthService} from '@services/auth';

@Injectable()
export class UploadMonitorService extends ServiceExtend {
  url = environment.adminApiUrl + '/api/devices';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected message: NzMessageService,
  ) {
    super(http, authService, message);
  }

  getAttachments(device: string, docType: string): any {
    return this.http
      .get(`${this.url}/${device}/attachments`, {params: {docType}})
      .pipe(catchError(err => this.handleError(err)));
  }

  getByIdToAttachmentsTemplate(device: string): any {
    return this.http
      .get(`${this.url}/${device}/attachments/template`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createAttachmentsTemplate(device: string, data): any {
    return this.http
      .post(`${this.url}/${device}/attachments`, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteImage(device, id): any {
    return this.http
      .delete(`${this.url}/${device}/attachments/${id}`, {})
      .pipe(catchError(err => this.handleError(err)));
  }
}
