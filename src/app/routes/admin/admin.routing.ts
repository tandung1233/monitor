import { CameraComponent } from './pages/device/detail/camera/camera.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {DeviceComponent} from './pages/device/device.component';
import {GroupComponent} from './pages/device/group/group.component';

import {DetailMonitorComponent} from './pages/device/detail/detail-monitor.component';
import {ChartMonitorComponent} from './pages/device/detail/chart/chart-monitor.component';
import {UploadMonitorComponent} from './pages/device/detail/upload/upload-monitor.component';

import {UserComponent} from './pages/user/user.component';
import { PermissionComponent } from './pages/permission/permission.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: DeviceComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'd/:name',
        component: DetailMonitorComponent
      },
      {
        path: 'd/:name/chart',
        component: ChartMonitorComponent
      },
      {
        path: 'd/:name/upload',
        component: UploadMonitorComponent
      },
      {
        path: 'd/:name/camera',
        component: CameraComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'permission',
        component: PermissionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {
}
