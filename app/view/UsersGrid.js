Ext.define('FRONT_1.view.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    title: 'Gestión de Usuarios',
    store: { type: 'usersstore' },

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: [
            '<div style="padding:10px;">',
                '<p><b>Rol:</b> {rolNombre}</p>',
                '<p><b>Dirección:</b> {direccion}</p>',
                '<p><b>Ciudad:</b> {ciudad}</p>',
                '<p><b>País:</b> {pais}</p>',
                '<p><b>Cargo:</b> {cargo}</p>',
                '<p><b>Estudios:</b> {nivelEstudios}</p>',
            '</div>'
        ]
    }],

    columns: [
        { xtype: 'rownumberer' },
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Nombres', dataIndex: 'nombres', flex: 1 },
        { text: 'Apellidos', dataIndex: 'apellidos', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Edad', dataIndex: 'edad', width: 80 },

        // 🔥 NUEVA COLUMNA DE ROL
        { text: 'Rol', dataIndex: 'rolNombre', flex: 1 },

        {
            xtype: 'actioncolumn',
            width: 150,
            items: [
                {
                    iconCls: 'fa fa-edit',
                    tooltip: 'Editar',
                    handler: 'onEditUser'
                },
                {
                    iconCls: 'fa fa-trash',
                    tooltip: 'Eliminar',
                    handler: 'onDeleteUser'
                }
            ]
        }
    ],

    tbar: [
        { text: 'Nuevo Usuario', iconCls: 'fa fa-plus', handler: 'onNewUser' }
    ],

    controller: {
        onNewUser(grid) {
            let win = Ext.create('FRONT_1.view.UserForm');
            win.on('usersaved', () => grid.getStore().reload());
            win.show();
        },

        onEditUser(grid, rowIndex, colIndex, item, e, record) {
            let win = Ext.create('FRONT_1.view.UserForm', {
                isEdit: true,
                record: record
            });
            win.on('usersaved', () => grid.getStore().reload());
            win.show();
        },

        onDeleteUser(grid, rowIndex, colIndex, item, e, record) {

            // 🔥 VALIDACIÓN: NO eliminar si tiene rol asignado
            if (record.get('rolId')) {
                Ext.Msg.alert('No permitido', 
                    `Este usuario tiene rol asignado: <b>${record.get('rolNombre')}</b><br>
                     Primero reasígnalo antes de eliminar.`
                );
                return;
            }

            Ext.Msg.confirm('Confirmación',
                '¿Seguro que desea eliminar este usuario?',
                choice => {
                    if (choice === 'yes') {
                        Ext.Ajax.request({
                            url: 'http://localhost:8080/api/users/' + record.get('id'),
                            method: 'DELETE',
                            success: () => grid.getStore().reload()
                        });
                    }
                }
            );
        }
    }
});
