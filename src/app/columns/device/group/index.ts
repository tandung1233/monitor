import {DataTableModel} from '@components/data-table/data-table.model';

export function columns(self): DataTableModel[] {
  return [
    {
      name: 'groupName',
      title: 'Tên',
      formItem: {
        rules: [ { type: 'required' } ]
      },
    },
  ];
}
