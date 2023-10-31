import {DataTableModel} from '@components/data-table/data-table.model';
import { number } from 'echarts';

export function columnsCamera(self: any): DataTableModel[] {
    return [
      {
        name: 'code',
        title: 'Code',
        tableItem: {
          width: '120px',
          render: (data: any) => (
              `<strong> ${data?.code} </strong>`
          )
        },
        formItem: {
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'status',
        title: 'Status',
        tableItem: {
          width: '240px',
          render: (data: any) => (
            (data?.status && data?.status.indexOf("Connected") > -1) ?
              `<span class="text-green"> ${data?.status} </span>` : `<span class="text-blue" > ${data?.status} </span>`
          )
        },
      },
      {
        name: 'ip',
        title: 'IP',
        tableItem: {
          width: '120px'
        },
        formItem: { 
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'username',
        title: 'User',
        tableItem: {
          width: '100px'
        },
        formItem: {
          value: 'admin',
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'password',
        title: 'Pass ',
        tableItem: {
          width: '100px'
        },
        formItem: {
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'lastCapturedOnDate',
        title: 'Last Captured',
        tableItem: {
          width: '160px',
          render: (data: any) =>
           self.formatDate(data.lastCapturedOnDate, 'HH:mm:ss DD/MM/YYYY')
        },
      },
      {
        name: 'folderId',
        title: 'FolderId',
        tableItem: {
          width: '160px',
        } 
      },
      {
        name: 'captureConfig',
        title: 'Capture Config',
        tableItem: {
        },
        formItem: {
          value: '0-24:300',
          rules: [{ type: 'required' },]
        }
      },
      {
        name: '',
        title: 'Action',
        tableItem: {
          width: '80px',
          actions: [
            {
              icon: () => 'las la-edit',
              text: () => 'edit',
              onClick: (item: any) => self.handleEdit(item)
            },
            {
              icon: () => 'las la-trash',
              text: () => 'delete',
              bgColor: () => '#ec3737',
              confirm: true,
              onClick: (item: any) => self.handleDelete(item)
            }
          ],
        },
      },
      {
        name: 'vendor',
        title: 'Vendor',
        formItem: {
          type: 'select',
          value: 'HIKVISION',
          list: [
            { value: 'HIKVISION', label: 'HIKVISION' },
          ],
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'channel',
        title: 'Channel ',
        formItem: {
          value: 101,
          type: 'number',
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'folderId',
        title: 'Folder ID',
        formItem: {
          rules: [{ type: 'required' },]
        }
      },
      {
        name: 'lastCapturedOnDate',
        title: 'Last Captured',
        formItem: {
          readonly: true,
          type: 'only-text',
          render: (data: any) =>
           self.formatDate(data.lastCapturedOnDate, 'HH:mm:ss DD/MM/YYYY')
        } 
      },
    ];
  }

export function columnsCameraAdd(self: any): DataTableModel[] {
  return [ 
    {
      name: 'code',
      title: 'Code',
      formItem: {
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'ip',
      title: 'IP',
      formItem: { 
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'vendor',
      title: 'Vendor',
      formItem: {
        type: 'select',
        value: 'HIKVISION',
        list: [
          { value: 'HIKVISION', label: 'HIKVISION' },
        ],
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'username',
      title: 'Username',
      formItem: {
        value: 'admin',
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'password',
      title: 'Password ',
      formItem: {
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'channel',
      title: 'Channel ',
      formItem: {
        value: 101,
        type: 'number',
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'folderId',
      title: 'Folder ID',
      formItem: {
        rules: [{ type: 'required' },]
      }
    },
    {
      name: 'captureConfig',
      title: 'Capture Config',
      formItem: {
        value: '0-24:300',
      }
    },
  ]
}
   