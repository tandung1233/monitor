import {DataTableModel} from '@components/data-table/data-table.model';

export function columns(self): DataTableModel[] {
  return [
    {
      name: 'name',
      title: 'Họ và tên',
      formItem: {
        rules: [
          {
            type: 'required',
          },
        ]
      }
    },
    {
      name: 'loginName',
      title: 'Tài khoản',
      formItem: {
        rules: [
          {
            type: 'required',
          },
        ]
      }
    },
    {
      name: 'password',
      title: 'routes.auth.register.password',
      formItem: {
        type: 'password',
        confirm: true,
        rules: [
          {
            type: 'required',
          },
        ]
      }
    },
  ];
}
