/**
 * GRID DE USUARIOS
 * 
 * El grid es una tabla que muestra los datos y permite interactuar con ellos.
 * 
 * Aprenderás:
 * - Cómo crear un grid en ExtJS
 * - Cómo conectar el grid con el store
 * - Cómo implementar las operaciones CRUD
 */

Ext.define('FRONT_1.view.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    title: '👥 Gestión de Usuarios',
    frame: true,

    store: {
        type: 'usersstore'
    },

    // PLUGIN: RowExpander funcional
    plugins: [{
        ptype: 'rowexpander',
        expandOnDblClick: false,
        rowBodyTpl: [
            '<div style="padding:10px; line-height:20px;">',
                '<p><b>Apellidos:</b> {apellidos}</p>',
                '<p><b>Edad:</b> {edad} años</p>',
                '<p><b>Sexo:</b> {sexo}</p>',
                '<p><b>Dirección:</b> {direccion}</p>',
                '<p><b>Ciudad:</b> {ciudad}</p>',
                '<p><b>País:</b> {pais}</p>',
                '<p><b>Cargo:</b> {cargo}</p>',
                '<p><b>Nivel Estudios:</b> {nivelEstudios}</p>',
            '</div>'
        ]
    }],

    columns: [
        { xtype: 'rownumberer', width: 40 },

        {
            text: 'ID',
            dataIndex: 'id',
            width: 60,
            align: 'center',
            renderer: v => `<b>#${v}</b>`
        },
        {
            text: 'Nombres',
            dataIndex: 'nombres',
            flex: 1,
            renderer: v => `<i class="fa fa-user"></i> ${v}`
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1,
            renderer: v => `<i class="fa fa-envelope"></i> ${v}`
        },
        {
            text: 'Edad',
            dataIndex: 'edad',
            width: 80,
            align: 'center',
            renderer: v => `${v} años`
        },

        // ACCIONES CRUD
        {
            text: 'Acciones',
            xtype: 'actioncolumn',
            width: 120,
            align: 'center',
            items: [
                {
                    iconCls: 'fa fa-edit',
                    tooltip: 'Editar usuario',
                    handler: 'onEditUser'
                },
                {
                    iconCls: 'fa fa-trash',
                    tooltip: 'Eliminar usuario',
                    handler: 'onDeleteUser'
                }
            ]
        }
    ],

    // BARRA SUPERIOR
    tbar: [
        {
            text: 'Nuevo Usuario',
            iconCls: 'fa fa-plus',
            handler: 'onNewUser',
            scale: 'medium'
        },
        '-',
        {
            text: 'Recargar',
            iconCls: 'fa fa-refresh',
            handler: 'onReload',
            scale: 'medium'
        },
        '->',
        {
            xtype: 'textfield',
            reference: 'searchField',
            emptyText: 'Buscar...',
            width: 200,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSearch'
            }
        }
    ],

    // PAGINACIÓN
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando usuarios {0} - {1} de {2}',
        emptyMsg: 'No hay usuarios para mostrar'
    },

    listeners: {
        itemdblclick: 'onEditUser'
    },

    // CONTROLADOR INTERNO
    controller: {

        // ---- CREAR USUARIO ----
        onNewUser: function () {
            let win = Ext.create('FRONT_1.view.UserForm', {
                isEdit: false
            });

            // Recargar al guardar
            win.on('usersaved', () => {
                this.getView().getStore().reload();
            });

            win.show();
        },

        // ---- EDITAR USUARIO ----
        onEditUser: function (grid, record) {
            let win = Ext.create('FRONT_1.view.UserForm', {
                isEdit: true,
                record: record
            });

            win.on('usersaved', () => {
                this.getView().getStore().reload();
            });

            win.show();
        },

        // ---- ELIMINAR USUARIO ----
        onDeleteUser: function (grid, rowIndex, colIndex, item, e, record) {
            Ext.Msg.confirm('Eliminar', '¿Desea eliminar este usuario?', choice => {

                if (choice === 'yes') {

                    Ext.Ajax.request({
                        url: 'http://localhost:8080/api/users/' + record.get('id'),
                        method: 'DELETE',

                        success: () => {
                            Ext.Msg.alert('Éxito', 'Usuario eliminado');
                            grid.getStore().reload();
                        },

                        failure: (res) => {
                            Ext.Msg.alert('Error', 'No se pudo eliminar: ' + res.statusText);
                        }
                    });
                }
            });
        },

        // ---- RECARGAR ----
        onReload: function () {
            this.getView().getStore().reload();
        },

        // ---- BUSCAR ----
        onSearch: function (field) {
            let store = this.getView().getStore(),
                value = field.getValue()?.toLowerCase();

            store.clearFilter();

            if (value) {
                store.filterBy(rec =>
                    rec.get('nombres').toLowerCase().includes(value) ||
                    rec.get('email').toLowerCase().includes(value)
                );
            }
        }
    }
});
