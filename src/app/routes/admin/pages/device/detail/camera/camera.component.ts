import { Validators } from '@angular/forms';
import { ComponentExtend } from '@extends/component';
import { CameraMonitorService } from './../../../../../../services/device/detail/camera/index';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { columnsCamera } from '@columns/device/detail/camera';
import { AdminService } from '@services/admin';
import {NzMessageService} from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { columnsCameraAdd } from '@columns/device/detail/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  providers: [CameraMonitorService]
})
export class CameraComponent extends ComponentExtend implements OnInit {
  nameDevice;
  isVisible = false;
  isVisibleAdd = false;
  data: any = null;
  formAdd = columnsCameraAdd(this)

  cameraSize = 20;
  camera = [];
  columnsCamera = columnsCamera(this);

  constructor(
    private location: Location,
    protected route: ActivatedRoute,
    protected service: CameraMonitorService,
    protected adminService: AdminService,
    protected message: NzMessageService,
  ) {
    super(route,adminService,message,service)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      document.title = params.name;
      this.nameDevice = params.name;
      this.onLoadCamera();
    });
  }
  
  backClicked(): void {
    this.location.back();
  }

  onLoadCamera(): void {
    this.service.getListCamera(this.nameDevice).subscribe(({data}) => {
      this.camera = data;
    });
  }

  postCamera(validateForm): void {
    this.service.postListCamera(this.nameDevice, validateForm.value).subscribe((res) => {
      this.success(res.message)
      this.onLoadCamera();
      this.isVisible = false;
      this.isVisibleAdd = false;
    });
  }

  handleAddNew(): void {
    this.data = null;
    this.isVisibleAdd = true;
  }   
  handleDelete(item: any): void {
    this.isLoading = true;
    console.log(item)
    this.service.deleteCamera(this.nameDevice, item.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((res: any) => {
        this.success(res.message)
        this.onLoadCamera();
      });
  }
}
