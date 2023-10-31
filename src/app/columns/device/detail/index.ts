import {DataTableModel} from '@components/data-table/data-table.model';

export function columnsLog(self): DataTableModel[] {
  return [
    {
      name: 'createdDate',
      title: 'Thời gian',
      tableItem: {
        render: (data, i) => self.formatDate(data.createdDate),
      }
    },
    {
      name: 'content',
      title: 'Nội dung',
      tableItem: {
        render: (data, i) => data.content,
      }
    },
  ];
}
export function columnsTitleDescription(self): DataTableModel[] {
  return [
    {
      name: 'name',
      title: 'Tên',
      tableItem: {
        render:  (data, i) => `<strong>${data.name}</strong> ${data.value !== null ? `<span class="gn-ml-5">${data.value}</span>` : ''} ${data.type == 'PUSH_CMD' ? `<small class="gn-label-red">Push</small>` : `<small class="gn-label-green">Pull</small>`}`
      },
      formItem: {
        placeholder: 'Chọn lệnh bên dưới',
        rules: [{type: 'required'}],
      }
    },
    {
      name: 'value',
      title: 'Giá trị',
      formItem: {
        placeholder: 'Giá trị lệnh'
      }
    },
    {
      name: '',
      title: 'routes.admin.Layout.action',
      tableItem: {
        width: '80px',
        actions: [
          {
            text: () => 'routes.admin.Layout.delete',
            bgColor: () => 'orange',
            confirm: true,
            onClick: (item, index) => self.handleDelete(item),
          },
        ],
      },
    },
  ];
}
export function columnsNameValue(self): DataTableModel[] {
  return [
    {
      name: 'name',
      title: 'Tên',
      tableItem: {
        onClick: (data) => self.handleEditConfig(data),
        render: (data, i) => `<strong class="gn-color-blue">${data.name}</strong> <span class="gn-ml-5">${data.value}</span>`,
      },
      formItem: {
        placeholder: 'Chọn cấu hình để thay đổi',
        rules: [{type: 'required'}],
      }
    },
    {
      name: 'value',
      title: 'Giá trị',
      formItem: {
        placeholder: 'Giá trị cấu hình'
      }
    }
  ];
}
export function columnsMetadata(self): DataTableModel[] {
  return [
    {
      name: 'name',
      title: 'Tên',
      tableItem: {
      }
    },
    {
      name: 'value',
      title: 'Giá trị',
      tableItem: {}
    }
  ];
}
export function columnsErrors(self): DataTableModel[] {
  return [
    {
      name: 'errorCode',
      title: 'Mã',
      tableItem: {
      }
    },
    {
      name: 'errorDescription',
      title: 'Tên lỗi',
      tableItem: {}
    }
  ];
}
