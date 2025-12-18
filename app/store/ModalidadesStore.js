Ext.define('App.store.ModalidadesStore', {
    extend: 'Ext.data.Store',
    storeId: 'modalidadesStore',

    fields: ['id', 'nombre'],

    data: [
        { id: 'Ambulatorio', nombre: 'Ambulatorio' },
        { id: 'Ingreso', nombre: 'Ingreso' },
        { id: 'Seguimiento', nombre: 'Seguimiento' },
        { id: 'Telemedicina', nombre: 'Telemedicina' }
    ]
});
