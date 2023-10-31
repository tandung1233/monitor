import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';

import {DataTableModel} from '@components/data-table/data-table.model';
import {AdminService} from '@services/admin';

@Injectable()
export abstract class ComponentExtend {
  totalItem: number;
  isLoading = false;
  listOfData = [];
  langPrefix: string;

  listOfColumns: DataTableModel[];
  isVisible = false;
  data = null;

  protected constructor(
    protected route: ActivatedRoute,
    protected adminService: AdminService,
    protected message: NzMessageService,
    protected service: any,
  ) {}


  onInit(): void {
    this.route.url.subscribe(url => this.adminService.link$.next(url[0].path));
  }
  formatCurrency(money: number): string {
    return (money ? money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0') + '₫';
  }
  formatDate(date: any, format = 'HH:mm:ss DD/MM'): string {
    return date ? moment(date).format(format) : '';
  }
  formatNumber(value: number): number {
    return parseInt(value.toString(), 0);
  }

  formatFloat(value: any): string {
    return value ? parseFloat(value).toFixed(1) : value;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  handleEdit(item): void {
    this.isVisible = true;
    this.data = item;
  }
  handleAddNew(): void {
    this.data = null;
    this.isVisible = true;
  }
  onChange(data): void {
    this.isLoading = true;
    this.service.get(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
      this.listOfData = res.data.content;
      this.totalItem = res.data.totalElements;
    });
  }
  handleOk(validateForm): void {
    if (validateForm.status === 'VALID') {
      this.isLoading = true;
      if (!!this.data?.id) {
        this.service.put(validateForm.value, this.data.id)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(res => this.success(res.message));
      } else {
        this.service.post(validateForm.value)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(res => this.success(res.message));
      }
    }
  }
  handleDelete(item): void {
    this.isLoading = true;
    this.service.delete(item.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => this.success(res.message));
  }

  handleChangeLoading(status: boolean): void {
    this.isLoading = status;
  }

  success(message): void {
    this.isVisible = false;
    this.message.success(message);
    this.onChange(null);
  }

  pickTextColorBasedOnBgColorAdvanced = (bgColor, lightColor, darkColor) => {
    const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.4) ? darkColor : lightColor;
  }
}
