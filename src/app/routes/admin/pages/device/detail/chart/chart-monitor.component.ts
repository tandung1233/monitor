import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';

import {ComponentExtend} from '@extends/component';
import {AdminService} from '@services/admin';

import {ChartMonitorService} from '@services/device/detail/chart';
import {
  columnsBattery, columnsHumidity, columnsTemperature, columnsUploadSpeed,
} from '@columns/device/detail/chart';
import * as echarts from 'echarts';
import * as moment from 'moment';

@Component({
  selector: 'app-chart-monitor',
  templateUrl: './chart-monitor.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ChartMonitorService]
})
export class ChartMonitorComponent extends ComponentExtend implements OnInit {
  isLoading = true;
  nameDevice;

  batterySize = 20;
  battery = [];
  columnsBattery = columnsBattery(this);

  uploadSpeedSize = 20;
  uploadSpeed = [];
  columnsUploadSpeed = columnsUploadSpeed(this);

  temperatureSize = 20;
  temperature = [];
  columnsTemperature = columnsTemperature(this);

  humiditySize = 20;
  humidity = [];
  columnsHumidity = columnsHumidity(this);
  constructor(
    protected route: ActivatedRoute,
    protected service: ChartMonitorService,
    protected translate: TranslateService,
    protected message: NzMessageService,
    protected adminService: AdminService,
    private location: Location
  ) {
    super(route, adminService, message, service);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      document.title = params.name;
      this.nameDevice = params.name;
      this.onLoadBattery();
      this.onUploadSpeed();
      this.onTemperature();
      this.onHumidity();
    });
  }

  backClicked(): void {
    this.location.back();
  }

  onLoadBattery(): void {
    this.service.getTimeBattery(this.nameDevice, this.batterySize).subscribe(({data}) => {
      if (data.length > this.battery.length) {
        this.onRenderChart(data.reverse(), 'chart-time-series', 0, 'V');
      }
      this.battery = data.reverse();
    });
  }
  handleChangeSizeBattery(num: number): void {
    this.batterySize += num;
    this.onLoadBattery();
  }

  onUploadSpeed(): void {
    this.service.getTimeUploadSpeed(this.nameDevice, this.uploadSpeedSize).subscribe(({data}) => {
      if (data.length > this.uploadSpeed.length) {
        this.onRenderChart(data.reverse(), 'chart-upload-speed', 1, 'KB/s');
      }
      this.uploadSpeed = data.reverse();
    });
  }
  handleChangeSizeUploadSpeed(num: number): void {
    this.uploadSpeedSize += num;
    this.onUploadSpeed();
  }

  onTemperature(): void {
    this.service.getTimeTemperature(this.nameDevice, this.temperatureSize).subscribe(({data}) => {
      if (data.length > this.temperature.length) {
        this.onRenderChart(data.reverse(), 'chart-temperature', 2, 'C');
      }
      this.temperature = data.reverse();
    });
  }
  handleChangeSizeTemperature(num: number): void {
    this.temperatureSize += num;
    this.onTemperature();
  }

  onHumidity(): void {
    this.service.getTimeHumidity(this.nameDevice, this.humiditySize).subscribe(({data}) => {
      if (data.length > this.humidity.length) {
        this.onRenderChart(data.reverse(), 'chart-humidity', 3, '%');
      }
      this.humidity = data.reverse();
    });
  }

  handleChangeSizeHumidity(num: number): void {
    this.humiditySize += num;
    this.onHumidity();
  }

  onRenderChart(data, idElement, indexColor, nameY): void {
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
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[indexColor]};"></span>
                ${v.name}
                <span style="color:${color[indexColor]};font-weight:700;font-size: 18px">${v.value}</span>
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
          name: nameY,
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
          itemStyle: {
            color: color[indexColor],
          },
          areaStyle: {},
          data: yAxisData1
        }, ]
      };
      echarts.init(document.getElementById(idElement)).setOption(option);
  }
}
