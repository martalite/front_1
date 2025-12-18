Ext.define('App.store.CentroStore', {
    extend: 'Ext.data.Store',
    alias: 'store.centros',

    storeId: 'centrosStore',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/centros',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },

    autoLoad: true
});
