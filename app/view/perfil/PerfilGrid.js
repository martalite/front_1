Ext.define('App.view.perfil.PerfilGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'perfilgrid',

    title: 'Gestión de Perfiles',

    store: {
        type: 'perfiles',     
        storeId: 'perfilesStoreId'
    },

    columns: [
        { text: 'ID', dataIndex: 'id', width: 70 },
        { text: 'Nombre', dataIndex: 'nombre', flex: 1 },
        { text: 'Descripción', dataIndex: 'descripcion', flex: 2 },

        {
            xtype: 'actioncolumn',
            text: 'Acciones',
            width: 120,
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Editar',
                    handler: function(grid, rowIndex) {
                        const rec = grid.getStore().getAt(rowIndex);
                        console.log("Editar perfil", rec.data);
                        // Aquí abres tu ventana de edición si la tienes
                    }
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Eliminar',
                    handler: function(grid, rowIndex) {
                        const rec = grid.getStore().getAt(rowIndex);

                        Ext.Msg.confirm(
                            'Confirmar eliminación',
                            `¿Seguro que deseas eliminar el perfil <b>${rec.get('nombre')}</b>?`,
                            function(choice) {

                                if (choice === 'yes') {
                                    Ext.Ajax.request({
                                        url: 'http://localhost:8080/api/perfiles/' + rec.get('id'),
                                        method: 'DELETE',

                                        success: function() {
                                            Ext.Msg.alert('OK', 'Perfil eliminado');
                                            grid.getStore().reload();
                                        },

                                        failure: function(response) {
                                            // 👇 Aquí llega el error del backend (perfil en uso)
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
            handler: function() {
                console.log("Abrir ventana de crear perfil");
            }
        },
        {
            text: 'Recargar',
            handler: function(btn) {
                btn.up('grid').getStore().reload();
            }
        }
    ]
});
