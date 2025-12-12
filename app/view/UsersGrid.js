Ext.define('App.view.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    requires: [
        'App.view.UserForm',
        'App.view.centros.CentrosWindow'  
    ],

    title: 'Gestión de Usuarios',

    store: {
        type: 'users',
        storeId: 'usersStoreId'
    },

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
        { text: 'ID', dataIndex: 'id', width: 50 },
        { text: 'Nombres', dataIndex: 'nombre', flex: 1 },
        { text: 'Apellidos', dataIndex: 'apellido', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1.5 },
        { text: 'Edad', dataIndex: 'edad', width: 80 },

        {
            text: 'Perfil',
            dataIndex: 'perfilId',
            width: 120,
            renderer: function (value) {
                const store = Ext.getStore('perfilesStoreId');
                const rec = store ? store.getById(value) : null;
                return rec ? rec.get('nombre') : value;
            }
        },

        {
            xtype: 'actioncolumn',
            text: 'Acciones',
            width: 150,
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Editar usuario',
                    handler: function(grid, rowIndex) {
                        const rec = grid.getStore().getAt(rowIndex);
                        const win = Ext.create('App.view.UserForm', {
                            isEdit: true,
                            userId: rec.get('id')
                        });
                        win.down('form').loadRecord(rec);
                        win.show();
                    }
                },
                {
                    iconCls: 'x-fa fa-building',
                    tooltip: 'Gestionar centros',
                    handler: function (grid, rowIndex) {
                        const rec = grid.getStore().getAt(rowIndex);

                        Ext.create('App.view.centros.CentrosWindow', {
                            userRecord: rec
                        }).show();
                    }
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Eliminar',
                    handler: function(grid, rowIndex) {
                        const rec = grid.getStore().getAt(rowIndex);

                        Ext.Msg.confirm('Confirmar',
                            '¿Seguro que deseas eliminar este usuario?',
                            function(choice) {
                                if (choice === 'yes') {
                                    Ext.Ajax.request({
                                        url: 'http://localhost:8080/api/users/' + rec.get('id'),
                                        method: 'DELETE',
                                        success: function() {
                                            grid.getStore().reload();
                                        },
                                        failure: function() {
                                            Ext.Msg.alert('Error', 'No se pudo eliminar el usuario');
                                        }
                                    });
                                }
                            });
                    }
                }
            ]
        }
    ],  

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
