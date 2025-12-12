Ext.define('App.view.MainView', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainview',

    requires: [
        'App.view.UsersGrid',
        'App.view.perfil.PerfilGrid'
    ],

    items: [
        {
            title: 'Usuarios',
            xtype: 'usersgrid'
        },
        {
            title: 'Perfiles',
            xtype: 'perfilgrid'
        }
    ]
});
