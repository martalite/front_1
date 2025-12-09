/**
 * APLICACIÓN PRINCIPAL
 * 
 * Este archivo inicializa la aplicación ExtJS.
 * 
 * Aprenderás:
 * - Cómo inicializar una aplicación ExtJS
 * - Cómo crear el viewport principal
 * - La estructura básica de una app ExtJS
 */

// Habilitar el modo de desarrollo para ver mensajes detallados en consola
Ext.application({
    name: 'FRONT_1',

    requires: [
        'FRONT_1.view.UsersGrid',
        'FRONT_1.view.UserForm'
    ],

    launch: function () {

        console.log('%c🚀 Aplicación FRONT_1 iniciada', 'font-size:16px;color:#48c774;font-weight:bold;');

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            padding: 10,

            items: [{
                xtype: 'usersgrid',
                reference: 'mainGrid'
            }]
        });

        console.log('📍 API REST: http://localhost:8080/api/users');
    }
});
