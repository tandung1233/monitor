import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzSelectModule} from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';

import {GeneatDatatableModule} from '@components/data-table/data-table.module';
import {GeneatModalFormModule} from '@components/modal-form/modal-form.module';
import {GeneatModalModule} from '@components/modal/modal.module';
import {GeneatFormModule} from '@components/form/form.module';

import { MainComponent } from './components/main/main.component';
import { AdminRouting } from './admin.routing';

import { AdminComponent } from './admin.component';
import { SideComponent } from './components/side/side.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { DeviceComponent } from './pages/device/device.component';

import { DetailMonitorComponent } from './pages/device/detail/detail-monitor.component';
import { ChartMonitorComponent } from './pages/device/detail/chart/chart-monitor.component';
import { UploadMonitorComponent } from './pages/device/detail/upload/upload-monitor.component';

import { GroupComponent } from './pages/device/group/group.component';
import { UserComponent } from './pages/user/user.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { CameraComponent } from './pages/device/detail/camera/camera.component';


@NgModule({
  declarations: [
    AdminComponent,
    MainComponent,
    SideComponent,
    HeaderComponent,
    FooterComponent,
    DeviceComponent,
    DetailMonitorComponent,
    GroupComponent,
    ChartMonitorComponent,
    UserComponent,
    PermissionComponent,
    UploadMonitorComponent,
    CameraComponent,
  ],
  imports: [
    CommonModule,
    AdminRouting,
    FormsModule,
    GeneatModalModule,
    GeneatDatatableModule,
    GeneatModalFormModule,
    GeneatFormModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('ng-language') || 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
          return new TranslateHttpLoader(http, 'assets/translations/');
        },
        deps: [HttpClient]
      }
    }),
    NzDatePickerModule,
    NzLayoutModule,
    NzBadgeModule,
    NzPopoverModule,
    NzTabsModule,
    NzListModule,
    NzButtonModule,
    NzSkeletonModule,
    NzDrawerModule,
    NzGridModule,
    NzDividerModule,
    NzSpinModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzMenuModule,
    NzSelectModule,
    NzInputModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzInputNumberModule,
    NzUploadModule,
    NzRadioModule,
    NzToolTipModule,
    NzCardModule,
    NzTypographyModule,
    NzSwitchModule,
    NzAlertModule,
    NzCollapseModule,
    NzProgressModule,
    NzPopconfirmModule,
    // NgxSmoothDnDModule,
    NzTagModule,
  ]
})
export class AdminModule { }
