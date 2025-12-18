Ext.application({
    name: 'App',

    requires: [
        'App.view.login.Login',
        'App.view.MainView',
        'App.store.PacientesStore',
        'App.store.PerfilesStore',
        'App.store.UsersStore'
    ],

    launch: function () {

        // Login
        Ext.create('App.view.login.Login');

        // 🔥 STORES GLOBALES
        Ext.create('App.store.PacientesStore');
        Ext.create('App.store.PerfilesStore');
        Ext.create('App.store.UsersStore');
        Ext.create('App.store.CentroStore');
        Ext.create('App.store.PacientesStore');
        Ext.create('App.store.ModalidadesStore');


    }
});


