Ext.define('App.store.CentroStore', {
    extend: 'Ext.data.Store',
    alias: 'store.centros',

    fields: ['id', 'nombre'],

    data: [
        { id: 1, nombre: 'Centro 1' },
        { id: 2, nombre: 'Centro 2' },
        { id: 3, nombre: 'Centro 3' },
        { id: 4, nombre: 'Centro 4' },
        { id: 5, nombre: 'Centro 5' }
    ]
});
