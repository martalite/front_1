Ext.define('App.view.TestGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'testgrid',

    title: 'Grid Test',

    columns: [
        { text: 'Columna A', dataIndex: 'a', flex: 1 },
        { text: 'Columna B', dataIndex: 'b', flex: 1 }
    ],

    // Store inline y local (NO backend)
    store: {
        fields: ['a', 'b'],
        data: [
            { a: 'Fila 1', b: 'OK' },
            { a: 'Fila 2', b: 'OK' }
        ]
    }
});
