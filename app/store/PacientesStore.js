Ext.define('App.store.PacientesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.pacientes',

    storeId: 'pacientesStore',

    autoLoad: true,

    fields: [
        'nuhsa',
        'codigoTao',
        'sip2',
        'nombre',
        'primerApellido',
        'segundoApellido',
        'dni',
        'centro',
        'modalidadControl'
    ],

    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/pacientes',
        reader: {
            type: 'json'
        }
    }
});

