import {DataTableModel} from '@components/data-table/data-table.model';
export function columnsBattery(self): DataTableModel[] {
  return [
    {
      name: 'value',
      title: 'Điện áp',
      tableItem: {
        render: (data, i) => data.value + 'V',
      }
    },
    {
      name: 'createdOnDate',
      title: 'Giờ ghi nhận',
      tableItem: {
        render: (data, i) => self.formatDate(data.createdOnDate),
      }
    },

  ];
}
export function columnsUploadSpeed(self): DataTableModel[] {
  return [
    {
      name: 'value',
      title: 'Tốc độ Upload',
      tableItem: {
        render: (data, i) => data.value + 'KB/s',
      }
    },
    {
      name: 'createdOnDate',
      title: 'Giờ ghi nhận',
      tableItem: {
        render: (data, i) => self.formatDate(data.createdOnDate),
      }
    },

  ];
}
export function columnsTemperature(self): DataTableModel[] {
  return [
    {
      name: 'value',
      title: 'Nhiệt độ',
      tableItem: {}
    },
    {
      name: 'createdOnDate',
      title: 'Giờ ghi nhận',
      tableItem: {
        render: (data, i) => self.formatDate(data.createdOnDate),
      }
    },
  ];
}
export function columnsHumidity(self): DataTableModel[] {
  return [
    {
      name: 'value',
      title: 'Độ ẩm',
      tableItem: {}
    },
    {
      name: 'createdOnDate',
      title: 'Giờ ghi nhận',
      tableItem: {
        render: (data, i) => self.formatDate(data.createdOnDate),
      }
    },

  ];
}
