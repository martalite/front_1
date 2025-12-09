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

    pageSize: 25,

    proxy: {
        type: 'rest',       
        url: 'http://localhost:8080/api/users',

        appendId: true,     

        api: {
            read: 'http://localhost:8080/api/users/search',
            create: 'http://localhost:8080/api/users'
            
        },

        reader: {
            type: 'json',
            rootProperty: null,    
            totalProperty: 'total'
        },

        writer: {
            type: 'json',
            writeAllFields: true
        },

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        listeners: {
            exception: function (proxy, response) {
                console.error('❌ Error en la petición REST:', response);
                Ext.Msg.alert('Error', 'Error de servidor: ' + response.status);
            }
        }
    },

    autoLoad: true,
    autoSync: false
});
