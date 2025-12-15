Ext.define('App.view.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    requires: [
        'App.store.UsersStore',
        'Ext.grid.plugin.RowExpander',
        'App.view.UserForm',
        'App.view.centros.CentrosWindow'
    ],

    title: 'Usuarios',

    // Store principal (alias: store.users)
    store: {
        type: 'users'
    },

    // 🔽 RowExpander (detalles del usuario)
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p><b>Dirección:</b> {direccion}</p>',
            '<p><b>Ciudad:</b> {ciudad}</p>',
            '<p><b>País:</b> {pais}</p>',
            '<p><b>Cargo:</b> {cargo}</p>',
            '<p><b>Nivel estudios:</b> {nivelEstudios}</p>',
            '<p><b>Sexo:</b> {sexo}</p>'
        )
    }],

    columns: [
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Nombre', dataIndex: 'nombre', flex: 1 },
        { text: 'Apellido', dataIndex: 'apellido', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1.5 },
        { text: 'Edad', dataIndex: 'edad', width: 80 },

        // 🧩 Perfil (renderer SEGURO)
        {
            text: 'Perfil',
            dataIndex: 'perfilId',
            width: 140,
            renderer: function (value) {
                var store = Ext.getStore('perfilesStoreId');
                if (!store) {
                    return value;
                }
                var rec = store.getById(value);
                return rec ? rec.get('nombre') : value;
            }
        },

        // ⚙️ Acciones
        {
            xtype: 'actioncolumn',
            text: 'Acciones',
            width: 150,
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Editar usuario',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        Ext.create('App.view.UserForm', {
                            isEdit: true,
                            userId: rec.get('id')
                        }).show();
                    }
                },
                {
                    iconCls: 'x-fa fa-building',
                    tooltip: 'Gestionar centros',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        Ext.create('App.view.centros.CentrosWindow', {
                            userRecord: rec
                        }).show();
                    }
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Eliminar usuario',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        Ext.Msg.confirm(
                            'Confirmar eliminación',
                            '¿Seguro que deseas eliminar este usuario?',
                            function (choice) {
                                if (choice === 'yes') {
                                    Ext.Ajax.request({
                                        url: 'http://localhost:8080/api/users/' + rec.get('id'),
                                        method: 'DELETE',
                                        success: function () {
                                            grid.getStore().reload();
                                        },
                                        failure: function () {
                                            Ext.Msg.alert('Error', 'No se pudo eliminar el usuario');
                                        }
                                    });
                                }
                            }
                        );
                    }
                }
            ]
        }
    ],

    // 🔝 Barra superior
    tbar: [
        {
            text: 'Nuevo usuario',
            iconCls: 'x-fa fa-plus',
            handler: function () {
                Ext.create('App.view.UserForm', {
                    isEdit: false
                }).show();
            }
        },
        {
            text: 'Recargar',
            handler: function (btn) {
                btn.up('grid').getStore().reload();
            }
        }
    ]
});
