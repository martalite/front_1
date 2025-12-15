console.log('🔥 TestStore cargado');
Ext.define('App.store.TestStore', {
    extend: 'Ext.data.Store',

    alias: 'store.teststore',   // 🔥 CLAVE
    storeId: 'testStoreId',

    fields: ['a', 'b'],

    data: [
        { a: 'Fila 1', b: 'OK' },
        { a: 'Fila 2', b: 'OK' }
    ]
});
