import {DataTableModel} from '@components/data-table/data-table.model';

export function columnsUser(self): DataTableModel[] {
  return [
    {
      name: 'name',
      title: 'Name',
      tableItem: {
        render: (data) => '<strong>' + data.name + (data.isLocked ? '<span class="gn-label-red">Đang khóa</span>' : '') + '</strong>',
      },
      // formItem: {
      //   rules: [ { type: 'required' } ]
      // },
    },
    {
      name: 'loginName',
      title: 'Login Name',
      tableItem: {},
    },
    {
      name: 'roles',
      title: 'Roles',
      tableItem: {},
    },
    {
      name: 'level',
      title: 'Level',
      tableItem: {},
    },
    {
      name: 'lastLoginDate',
      title: 'Ngày login',
      tableItem: {
        width: '130px',
        sort: null,
        filter: {
          type: 'date',
          visible: false,
          value: null,
        },
        render: (data) => self.formatDate(data.lastLoginDate),
      }
    },
    {
      name: 'lastModifiedDate',
      title: 'Ngày sửa',
      tableItem: {
        width: '120px',
        sort: null,
        filter: {
          type: 'date',
          visible: false,
          value: null,
        },
        render: (data) => self.formatDate(data.lastModifiedDate),
      }
    },
    {
      name: 'createdDate',
      title: 'Ngày tạo',
      tableItem: {
        width: '120px',
        sort: null,
        filter: {
          type: 'date',
          visible: false,
          value: null,
        },
        render: (data) => self.formatDate(data.createdDate),
      }
    },
    {
      name: '',
      title: 'Action',
      tableItem: {
        width: '180px',
        actions: [
          {
            text: (data) => !!data.isLocked ? 'Mở khóa' : 'Khóa',
            bgColor: (data) => !!data.isLocked ? '#0461af' : '#ec3737',
            onClick: (item) => self.handleChangeLock(item)
          },
          {
            text: () => 'Kích hoạt',
            bgColor: () => '#318200',
            condition: (data) => !data.isActivated,
            onClick: (item) => self.handleChangeActive(item)
          },
        ],
      },
    },
  ];
}
