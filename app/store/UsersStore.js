/**
 * STORE DE USUARIOS
 * 
 * Un Store es una colección de registros (models) que conecta con un servidor.
 * Aquí es donde configuramos las llamadas REST API.
 * 
 * Aprenderás:
 * - Cómo configurar un proxy REST
 * - Las URLs para cada operación CRUD
 * - Cómo funciona la carga automática de datos
 */

Ext.define('App.store.UsersStore', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    storeId: 'usersStoreId', 

    fields: [
        'id', 'nombre', 'apellido', 'email', 'edad',
        'perfilId', 'centrosIds'
    ],

    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/users',
        reader: { type: 'json' }
    },

    autoLoad: true
});

