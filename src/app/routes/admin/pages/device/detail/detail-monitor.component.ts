import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as echarts from 'echarts';
import * as moment from 'moment';

import {NzMessageService} from 'ng-zorro-antd/message';

import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';

import {DetailMonitorService} from '@services/device/detail';

import {
  columnsErrors,
  columnsLog,
  columnsMetadata,
  columnsNameValue,
  columnsTitleDescription
} from '@columns/device/detail';

@Component({
  selector: 'app-detail-monitor',
  templateUrl: './detail-monitor.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [DetailMonitorService]
})
export class DetailMonitorComponent extends ComponentExtend implements OnInit {
  name: string;
  isLoading = true;
  data;
  dataDevice;
  command;
  error;
  columnsError = columnsErrors(this);
  images;
  log;
  columnsLog = columnsLog(this);
  config;
  configShow = {};
  metadata;
  columnsNameValue = columnsNameValue(this);
  columnsMetadata = columnsMetadata(this);
  columnsTitleDescription = columnsTitleDescription(this);
  logSize = 20;
  batterySize = 20;
  timeSeries = [];

  typeDevice = 'PULL_CMD';
  serviceDevice = 'MAIN';

  dataConfig;
  @ViewChild('formCommand') formCommand;
  @ViewChild('formCommand2') formCommand2;

  constructor(
    protected route: ActivatedRoute,
    protected service: DetailMonitorService,
    protected translate: TranslateService,
    protected message: NzMessageService,
    protected adminService: AdminService,
    private router: Router,
    private location: Location
  ) {
    super(route, adminService, message, service);
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    document.title = this.name;
    this.service.get(this.name)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.isVisible = true;
        this.dataDevice = res;
        this.handleRefreshCommand();
        this.onLoadDeviceConfig();
        this.onLoadDataLog();
        this.service.getMetadata(this.dataDevice.name).subscribe(({data}) => this.metadata = data);
        this.service.getError(this.dataDevice.name).subscribe(({data}) => this.error = data);
        this.service.getImage(this.dataDevice.name).subscribe(({data}) => this.images = data);
        this.onLoadBattery();
      });
  }

  handleChangeSize(num: number): void {
    this.batterySize += num;
    this.onLoadBattery();
  }

  onLoadBattery(): void {
    this.service.getTimeSeries(this.dataDevice.name, this.batterySize).subscribe(({data}) => {
      this.timeSeries = data.reverse();
      const color = ['#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];
      const xAxisData = data.map(v => moment(v.createdOnDate).format('DD/MM HH:mm '));
      const yAxisData1 = data.map(v => v.value);
      const hexToRgba = (hex, opacity) => {
        let rgbaColor = '';
        const reg = /^#[\da-f]{6}$/i;
        if (reg.test(hex)) {
          rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3), 0)},
                ${parseInt('0x' + hex.slice(3, 5), 0)},
                ${parseInt('0x' + hex.slice(5, 7), 0)},${opacity})`;
        }
        return rgbaColor;
      };

      const option = {
        color,
        legend: { show: false, },
        grid: {
          left: '1%',
          top: '20px',
          right: '50px',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let html = '';
            params.forEach(v => {
              html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                ${v.name}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                `;
            });
            return html;
          },
          extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: '#ffffff',
              shadowColor: 'rgba(225,225,225,1)',
              shadowBlur: 5
            }
          }
        },
        xAxis: {
          type: 'category',
          name: 'Giờ',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#666',
            fontSize: 12,
            lineHeight: 1,
            fontWeight: 'bold',
          },
          axisLine: {
            lineStyle: {
              color: '#D9D9D9'
            }
          },
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          name: 'V',
          scale: true,
          axisLabel: {
            textStyle: {
              color: '#666'
            }
          },
          nameTextStyle: {
            color: '#666',
            fontSize: 12,
            lineHeight: 1,
            fontWeight: 'bold',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#E9E9E9'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '2018',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          zlevel: 3,
          areaStyle: {},
          data: yAxisData1
        }, ]
      };
      echarts.init(document.getElementById('chart-time-series')).setOption(option);
    });
  }

  backClicked(): void {
    this.router.navigate(['./']);
  }

  handleLoadMoreLog(): void {
    this.logSize = this.logSize + 100;
    this.onLoadDataLog();
  }
  handleRefreshLog(): void {
    this.logSize = 20;
    this.onLoadDataLog();
  }
  handleDeleteError(): void {
    this.service
      .deleteError(this.dataDevice.name)
      .subscribe(({data}) => {
        this.error = [];
      });
  }
  onLoadDataLog(): void {
    this.service.getLog(this.dataDevice.name, this.logSize).subscribe(({logs}) => {
      this.log = logs.map((log) => {
        log.IsLink = false;

        if (log.content.indexOf('UPLOADED_') > 0 || log.content.indexOf('CAPTURED_') > 0) {
          log.content = log.content.replace(this.dataDevice.name, '');
          log.content = log.content.replace('__', '_');
          log.content = log.content.replace('_', ' ');
          log.content = log.content.replace('UPLOADED_', 'uploaded ');
          log.content = log.content.replace('CAPTURED_', 'captured ');
        }
        if (log.content.includes('_link:')) {
          log.content = log.content.split('_link:').map((item, index) => {
            if (index > 0) {
              const temp = item.split(' ');
              temp[0] = `<a target="self" href="${temp[0]}">Xem ảnh test</a>`;
              item = temp.join(' ');
            }
            return item;
          }).join('');
        }
        if (log.content.includes('_log:')) {
          log.content = log.content.split('_log:').map((item, index) => {
            if (index > 0) {
              const temp = item.split(' ');
              temp[0] = `<a target="self" href="${temp[0]}">Xem log file</a>`;
              item = temp.join(' ');
            }
            return item;
          }).join('');
        }
        return log;
      });
    });
  }

  handleRefreshCommand(): void {
    this.isLoading = true;
    this.service
      .getCommand(this.dataDevice.name)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(({data}) => this.command = data);
  }

  handleAddCommand(name, value): void {
    if (!!this.data && this.data.name === name) {
      this.isLoading = true;
      this.service.postCommand({
        name, value,
        type: this.typeDevice,
        service: this.serviceDevice
      }, this.dataDevice.deviceId)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(res => {
          this.message.success(res.message);
          this.handleRefreshCommand();
        });
    }
    this.data = {name, value};
  }

  handleNotifyCommand(): void {
    this.isLoading = true;
    this.service
      .postCommandCheck(this.dataDevice.deviceId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.message.success('Pushed command notify');
      });
  }

  handleSubmitCommand(): void {
    const {controls, statusChanges, status} = this.formCommand.validateForm;
    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsDirty();
        controls[i].updateValueAndValidity();
      }
    }
    if (status === 'VALID') {
      this.service.postCommand({
        ...this.formCommand.validateForm.value,
        type: this.typeDevice,
        service: this.serviceDevice
      }, this.dataDevice.deviceId)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(res => {
          this.message.success(res.message);
          this.handleRefreshCommand();
        });
    }
  }

  onLoadDeviceConfig(): void {
    this.service.getConfig(this.dataDevice.name).subscribe(({data}) => this.config = data);
  }
  handleEditConfig({name, value}): void {
    this.dataConfig = {name, value};
  }
  handleSubmitConfig(): void {
    this.service.postConfig(this.config, this.dataDevice.deviceId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.message.success(res.message);
        this.onLoadDeviceConfig();
      });
  }

  handleOk(validateForm): void {
    if (validateForm.status === 'VALID') {
      if (this.data?.title) {
        this.service.postCommand(validateForm.value, this.dataDevice.deviceId)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(res => {
            this.message.success(res.message);
            this.handleRefreshCommand();
          });
      } else {
        if (this.data.type === 'INFO') {
          this.service.postMetadata({...this.data, ...validateForm.value}, this.dataDevice.deviceId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(res => {
              this.message.success(res.message);
              this.service.getMetadata(this.dataDevice.name).subscribe(({data}) => this.metadata = data);
            });
        } else {
          this.service.postConfig([{...this.data, ...validateForm.value}], this.dataDevice.deviceId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(({data, message}) => {
              this.message.success(message);
              this.config = data;
              this.handleRefreshCommand();
            });
        }
      }
    }
  }

  handleDelete(item): void {
    this.isLoading = true;
    this.service.deleteCommand(item, this.dataDevice.deviceId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => this.handleRefreshCommand());
  }

  handleConfirmDelete(): void {
    this.isLoading = true;
    this.service.delete(this.dataDevice.deviceId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => this.router.navigate(['./admin/device']));
  }

  goToChartMonitor(): void {
    this.router.navigate(['./d', this.dataDevice.name, 'chart']);
  }
  goToUploadMonitor(): void {
    this.router.navigate(['./d', this.dataDevice.name, 'upload']);
  }
  goToListCamera(): void {
    this.router.navigate(['./d', this.dataDevice.name, 'camera']);
  }

  handleChangeInput(name, status): void {
    this.configShow[name] = status;
  }

  handlePushInput(name, status, value): void {
    this.handleChangeInput(name, status);
    this.service.postCommand({
      name: 'config:' + name,
      value,
      type: 'PUSH_CMD',
      service: 'MAIN'
    }, this.dataDevice.deviceId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.message.success(res.message);
        this.handleRefreshCommand();
      });
  }
}
