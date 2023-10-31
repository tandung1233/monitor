import {DataTableModel} from '@components/data-table/data-table.model';
import * as moment from 'moment';
export function columnsUser(self): DataTableModel[] {
  return [
    {
      name: 'name',
      title: 'Name',
      tableItem: {
        bgColor: (data) => data.id === self.userId ? '#318200' : 'transparent',
        onClick: (data) => self.handleGetDevice(data.id),
      },
    },
    {
      name: 'loginName',
      title: 'Login Name',
      tableItem: {
        bgColor: (data) => data.id === self.userId ? '#318200' : 'transparent',
        onClick: (data) => self.handleGetDevice(data.id),
      },
    },
    {
      name: 'roles',
      title: 'Roles',
      tableItem: {
        bgColor: (data) => data.id === self.userId ? '#318200' : 'transparent',
        onClick: (data) => self.handleGetDevice(data.id),
      },
    },
  ];
}
export function columns(self): DataTableModel[] {
  return [
    {
      name: 'deviceName',
      title: 'Device Name',
      tableItem: {
        render: (data) => `<strong class="${data.permission.split('').indexOf('r') === -1 ? 'gn-color-muted' : 'Bỏ xem'}">${data.deviceName}</strong>`,
      },
    },
    {
      name: '',
      title: 'Xem',
      tableItem: {
        width: '80px',
        actions: [
          {
            text: (data) => data.permission.split('').indexOf('r') === -1 ? 'Cho xem' : 'Bỏ xem',
            bgColor: (data) => data.permission.split('').indexOf('r') === -1 ? '#318200' : '#ec3737',
            onClick: (data) => self.handleChangePermission('r', data)
          },
        ],
      },
    },
    {
      name: '',
      title: 'Sửa',
      tableItem: {
        width: '80px',
        actions: [
          {
            text: (data) => data.permission.split('').indexOf('w') === -1 ? 'Cho sửa' : 'Bỏ sửa',
            bgColor: (data) => data.permission.split('').indexOf('w') === -1 ? '#318200' : '#ec3737',
            onClick: (data) => self.handleChangePermission('w', data)
          },
        ],
      },
    },
  ];
}
