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

    expanderFirst: false,
    expanderPosition: 1,

    store: {
        type: 'usersstore'
    },

    plugins: [{
        ptype: 'rowBodyTpl',
        rowBodyTpl: [
            '<div style="padding:8px;">',
                '<p><b>Nombres:</b> {nombres}</p>',
            '</div>'
        ]
    }],

     
        
    
    columns: [

        
         // Número de fila e indicador visual para expansión
        {
            text: '',
            width: 30,
            renderer: function () {
                return '<span class="expander-btn" style="cursor:pointer;font-size:14px;font-weight:bold;">▶</span>';
            }    
        },

        {
            xtype: 'rownumberer',
            width: 30
        },

        {
            text: 'ID',
            dataIndex: 'id',
            width: 60,
            align: 'center',
            renderer: function (value) {
                return '<b>#' + value + '</b>';
            }
        },
        {
            text: 'Nombres',
            dataIndex: 'nombres',
            flex: 1,
            renderer: function (value) {
                return '<i class="fa fa-user"></i> ' + value;
            }
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1,
            renderer: function (value) {
                return '<i class="fa fa-envelope"></i> ' + value;
            }
        },
        {
            text: 'Edad',
            dataIndex: 'edad',
            width: 80,
            align: 'center',
            renderer: function (value) {
                return value + ' años';
            }
        },
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
                    handler: 'onDeleteUser',
                    getClass: function () {
                        return 'fa fa-trash delete-icon';
                    }
                }
            ]
        }
    ],

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

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando usuarios {0} - {1} de {2}',
        emptyMsg: 'No hay usuarios para mostrar'
    },

    listeners: {

    cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        // Si hicieron clic en la primera columna (flecha)
        if (cellIndex === 0) {
            e.stopEvent(); 
            grid.findPlugin('rowexpander').toggleRow(record);
        }
    },

    itemdblclick: 'onEditUser' // solo doble clic edita
},


    controller: {

        onNewUser: function () {
            console.log('➕ Crear nuevo usuario');
        },

        onEditUser: function (grid, record) {
            console.log('📝 Editando usuario:', record.data);
        },

        onDeleteUser: function (grid, rowIndex, colIndex, item, e, record) {
            console.log('🗑 Eliminando usuario:', record.data);
        },

        onReload: function () {
            var grid = this.getView();
            grid.getStore().reload();
        },

        onSearch: function (field) {
            var grid = this.getView(),
                store = grid.getStore(),
                searchValue = field.getValue();

            store.clearFilter();

            if (searchValue) {
                searchValue = searchValue.toLowerCase();
                store.filterBy(function (record) {
                    return record.get('nombres').toLowerCase().includes(searchValue) ||
                           record.get('email').toLowerCase().includes(searchValue);
                });
            }
        }
    }
});
