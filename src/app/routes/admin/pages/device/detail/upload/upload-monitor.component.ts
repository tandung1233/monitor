import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {finalize} from 'rxjs/operators';

import {environment} from '@src/environments/environment';
import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';

import {UploadMonitorService} from '@services/device/detail/upload';

@Component({
  selector: 'app-upload-monitor',
  templateUrl: './upload-monitor.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [UploadMonitorService]
})
export class UploadMonitorComponent extends ComponentExtend implements OnInit {
  isLoading = true;
  nameDevice;

  infoUpload;
  urlUpload;
  listUpload = {};
  preview;
  previewVisible = false;
  showList = {};
  description = {};

  constructor(
    protected route: ActivatedRoute,
    protected service: UploadMonitorService,
    protected translate: TranslateService,
    protected message: NzMessageService,
    protected adminService: AdminService,
    private location: Location
  ) {
    super(route, adminService, message, service);
  }

  ngOnInit(): void {
    this.urlUpload = environment.adminApiUrl + '/api/v1/upload/blob?destinationPhysicalPath=';
    this.route.params.subscribe(params => {
      document.title = params.name;
      this.nameDevice = params.name;
      this.service
        .getByIdToAttachmentsTemplate(params.name)
        .subscribe((res) => {
          this.infoUpload = res;
          res.map((item) => {
            this.handleGetListAttachment(item.docType);
          });
        });
    });
  }

  backClicked(): void {
    this.location.back();
  }

  handleGetListAttachment(docType): void {
    this.service.getAttachments(this.nameDevice, docType).subscribe(({data: attachments}) => {
      this.listUpload[docType] = [];
      this.showList[docType] = false;
      this.description[docType] = '';
      attachments?.map(attach => {
        this.listUpload[docType].push({
          uid: attach.id,
          name: this.formatDate(attach.createdOnDate, 'HH:mm:ss DD/MM/YYYY'),
          status: 'done',
          url: attach?.file,
          docType,
          description: attach.description,
          createdOnDate: attach.createdOnDate,
        });
      });
    });
  }

  handleUpload(data, docType, index): void {
    if (data.type === 'success') {
      this.isLoading = true;
      this.service
        .createAttachmentsTemplate(this.nameDevice, {
          ...this.infoUpload[index],
          file: data.file.response.data.physicalPath,
          description: this.description[docType]
        })
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((res) => {
          this.handleGetListAttachment(docType);
          this.message.success(res.message);
        });
    }
  }

  handlePreview = async (file: NzUploadFile) => {
    this.preview = file;
    // this.preview = file.url || file.preview;
    this.previewVisible = true;
  }
  handleRemove = (file: NzUploadFile) => {
    this
      .service
      .deleteImage(this.nameDevice, file.uid)
      .subscribe(res => {
        this.handleGetListAttachment(file.docType);
        this.message.success(res.message);
      }, () => false);
  }

  handleAddImage(docType): void {
    this.showList[docType] = !this.showList[docType];
  }
}
