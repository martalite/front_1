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
    name: 'App',

    requires: [
        'App.view.UsersGrid',
        'App.view.UserForm',
        'App.view.perfil.PerfilGrid',
        'App.view.MainView',
        'App.store.PerfilesStore',
        'App.view.centros.CentrosWindow'

    ],

    launch: function () {
        console.log('%c🚀 Aplicación App iniciada', 'font-size:16px;color:#48c774;font-weight:bold;');

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'mainview'
            }]
        });
    }
});
