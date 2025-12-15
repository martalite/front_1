Ext.Loader.setConfig({
    enabled: true,
    paths: {
        App: 'app'
    }
});

Ext.application({
    name: 'App',

    requires: [
        'App.view.login.Login',
        'App.view.MainView'
    ],

    launch: function () {

    //  Login
    Ext.create('App.view.login.Login');

    //  crear store de perfiles
    Ext.create('App.store.PerfilesStore');
}

});
