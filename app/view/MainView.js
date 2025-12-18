Ext.define('App.view.MainView', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainview',

    requires: [
        'App.view.UsersGrid',
        'App.view.perfil.PerfilGrid',
        'App.view.pacientes.PacientesGrid'
    ],

    layout: 'border',

    items: [
        // 🟦 MENÚ LATERAL
        {
            region: 'west',
            title: 'Menú',
            width: 220,
            split: true,
            collapsible: true,
            layout: 'vbox',
            bodyPadding: 10,

            defaults: {
                xtype: 'button',
                width: '100%',
                margin: '0 0 10 0'
            },

            items: [
                {
                    text: 'Usuarios',
                    iconCls: 'x-fa fa-users',
                    handler: function () {
                        var panel = Ext.getCmp('main-content');
                        panel.removeAll();
                        panel.add({ xtype: 'usersgrid' });
                    }
                },
                {
                    text: 'Perfiles',
                    iconCls: 'x-fa fa-id-badge',
                    handler: function () {
                        var panel = Ext.getCmp('main-content');
                        panel.removeAll();
                        panel.add({ xtype: 'perfilgrid' });
                    }
                },
                
                {
                    text: 'Pacientes',
                    iconCls: 'x-fa fa-hospital-user',
                    handler: function () {
                        var panel = Ext.getCmp('main-content');
                        panel.removeAll();
                        panel.add({ xtype: 'pacientesgrid' });
                    }
                }    
            ]
        },

        // 🟩 CONTENIDO PRINCIPAL
        {
            region: 'center',
            xtype: 'panel',
            id: 'main-content',
            layout: 'fit',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'pacientesgrid'
                }
            ]
        }
    ]
});
