import {DataTableModel} from '@components/data-table/data-table.model';

export function columns(self): DataTableModel[] {
  return [
    {
      name: '',
      title: '#',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
        width: '35px',
        align: 'right',
        render: (data, i) => i + 1,
      },
    },
    {
      name: 'name',
      title: 'Tên',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
        onClick: (item) => self.goToDetailMonitor(item),
      }
    },
    {
      name: 'totalSpace',
      title: 'Dung lượng',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
      }
    },
    {
      name: 'freeSpace',
      title: 'Dung lượng trống',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
      }
    },
    {
      name: 'version',
      title: 'Phiên bản',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
      }
    },
    {
      name: 'imageEv',
      title: 'ev',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
      }
    },
    {
      name: 'imageIso',
      title: 'iso',
      tableItem: {
        bgColor: (data) => data.heartbeatStatus === 2 ? '#FFF4DE' : '#ffffff',
      }
    },
  ];
}
