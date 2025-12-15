Ext.define('App.view.perfil.PerfilGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'perfilgrid',

    requires: [
        'App.store.PerfilesStore',
        'App.view.perfil.PerfilForm'
    ],

    title: 'Gestión de Perfiles',

    store: {
        type: 'perfiles',        // alias: store.perfiles
        storeId: 'perfilesStoreId'
    },

    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: 70
        },
        {
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 1
        },
        {
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 2
        },
        {
            xtype: 'actioncolumn',
            text: 'Acciones',
            width: 120,
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Editar perfil',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        var win = Ext.create('App.view.perfil.PerfilForm', {
                            title: 'Editar Perfil'
                        });

                        win.down('form').loadRecord(rec);
                        win.show();
                    }
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Eliminar perfil',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        Ext.Msg.confirm(
                            'Confirmar eliminación',
                            '¿Seguro que deseas eliminar el perfil <b>' + rec.get('nombre') + '</b>?',
                            function (choice) {
                                if (choice === 'yes') {
                                    Ext.Ajax.request({
                                        url: 'http://localhost:8080/api/perfiles/' + rec.get('id'),
                                        method: 'DELETE',

                                        success: function () {
                                            Ext.Msg.alert('OK', 'Perfil eliminado');
                                            grid.getStore().reload();
                                        },

                                        failure: function (response) {
                                            Ext.Msg.alert(
                                                'Error',
                                                response.responseText || 'No se pudo eliminar el perfil'
                                            );
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

    tbar: [
        {
            text: 'Nuevo Perfil',
            iconCls: 'x-fa fa-plus',
            handler: function () {
                Ext.Msg.alert(
                    'Pendiente',
                    'Formulario de creación de perfil pendiente de implementar'
                );
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
