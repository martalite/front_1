Ext.define('App.store.PerfilesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.perfiles',

    fields: ['id', 'nombre', 'descripcion'],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/perfiles',
        reader: {
            type: 'json'
        }
    }
});
