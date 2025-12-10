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

Ext.define('FRONT_1.store.UsersStore', {
    extend: 'Ext.data.Store',
    alias: 'store.usersstore',

    model: 'FRONT_1.model.User',

    proxy: {
        type: 'rest',

        url: 'http://localhost:8080/api/users',

        // 🚫 IMPORTANTE: DESACTIVAR appendId
        appendId: false,

        api: {
            read: 'http://localhost:8080/api/users',
            create: 'http://localhost:8080/api/users',
            update: 'http://localhost:8080/api/users',
            destroy: 'http://localhost:8080/api/users'
        },

        reader: {
            type: 'json',
            rootProperty: null
        },

        writer: {
            type: 'json',
            writeAllFields: true
        },

        listeners: {
            exception: function (proxy, response) {
                console.error("❌ Error REST:", response);
                Ext.Msg.alert('Error', 'Error de servidor: ' + response.status);
            }
        }
    },

    autoLoad: true
});
