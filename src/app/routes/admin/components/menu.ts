export const ListMenu = [
  {
    title: 'Manage',
    child: [
      {
        icon: 'las la-lg gn-mr-10 la-box',
        name: 'Dashboard',
        path: ['/home'],
        level: 0,
      },
      {
        icon: 'las la-lg gn-mr-10 la-layer-group',
        name: 'Group',
        path: ['/group'],
        level: 10,
      },
      {
        icon: 'las la-lg gn-mr-10 la-chalkboard-teacher',
        name: 'Admin',
        level: 11,
        child: [
          {
            icon: 'las la-lg gn-mr-10 la-users',
            name: 'User',
            path: ['/user'],
            level: 0,
          },
          {
            icon: 'las la-lg gn-mr-10 la-user-lock',
            name: 'Permission',
            path: ['/permission'],
            level: 0,
          }
        ]
      }
    ]
  },
];
