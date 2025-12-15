Ext.define('App.view.TestGrid2', {
    extend: 'Ext.grid.Panel',
    xtype: 'testgrid2',

    requires: [
        'App.store.TestStore'
    ],

    title: 'Grid con Store externo',

    store: {
        type: 'teststore'   // 👈 alias sin "store."
    },

    columns: [
        { text: 'Columna A', dataIndex: 'a', flex: 1 },
        { text: 'Columna B', dataIndex: 'b', flex: 1 }
    ]
});
