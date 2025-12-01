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

Ext.define('Tutorial.view.UserGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.usergrid',

    // Título del panel
    title: '👥 Gestión de Usuarios - CRUD Completo',

    // Configuración del grid
    frame: true,

    // Asociar el store
    store: {
        type: 'users'
    },

    // Columnas del grid
    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: 60,
            align: 'center',
            // Renderizador personalizado para dar estilo
            renderer: function (value) {
                return '<span style="font-weight: bold; color: #667eea;">#' + value + '</span>';
            }
        },
        {
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 1,
            // Ordenable
            sortable: true,
            // Renderizador con icono
            renderer: function (value) {
                return '<i class="fa fa-user"></i> ' + value;
            }
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1,
            sortable: true,
            // Renderizador con icono
            renderer: function (value) {
                return '<i class="fa fa-envelope"></i> ' + value;
            }
        },
        {
            text: 'Edad',
            dataIndex: 'edad',
            width: 80,
            align: 'center',
            sortable: true,
            // Renderizador con icono
            renderer: function (value) {
                return '<i class="fa fa-birthday-cake"></i> ' + value;
            }
        },
        {
            text: 'Acciones',
            xtype: 'actioncolumn',
            width: 100,
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
                    // Estilo para el icono de eliminar
                    getClass: function () {
                        return 'fa fa-trash delete-icon';
                    }
                }
            ]
        }
    ],

    // Barra de herramientas superior
    tbar: [
        {
            text: 'Nuevo Usuario',
            iconCls: 'fa fa-plus',
            handler: 'onNewUser',
            // Estilo del botón
            ui: 'default',
            scale: 'medium'
        },
        '-', // Separador
        {
            text: 'Recargar',
            iconCls: 'fa fa-refresh',
            handler: 'onReload',
            scale: 'medium'
        },
        '->',  // Empuja los siguientes items a la derecha
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

    // Barra de paginación inferior
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando usuarios {0} - {1} de {2}',
        emptyMsg: 'No hay usuarios para mostrar'
    },

    // Listeners
    listeners: {
        // Se ejecuta cuando se hace doble clic en una fila
        itemdblclick: 'onEditUser'
    },

    // Controller con los métodos de acción
    controller: {

        /**
         * CREAR - Abrir formulario para nuevo usuario
         */
        onNewUser: function () {
            console.log('➕ Abriendo formulario para nuevo usuario');

            var form = Ext.create('Tutorial.view.UserForm', {
                isEdit: false
            });

            // Escuchar el evento de guardado
            form.on('usersaved', this.onReload, this);

            form.show();
        },

        /**
         * ACTUALIZAR - Abrir formulario para editar usuario
         */
        onEditUser: function (grid, record) {
            console.log('📝 Editando usuario:', record.data);

            var form = Ext.create('Tutorial.view.UserForm', {
                isEdit: true,
                record: record
            });

            // Escuchar el evento de guardado
            form.on('usersaved', this.onReload, this);

            form.show();
        },

        /**
         * ELIMINAR - Método DELETE
         * Elimina un usuario del servidor
         */
        onDeleteUser: function (grid, rowIndex, colIndex, item, e, record) {
            var me = this;

            console.log('🗑️ Solicitando eliminar usuario:', record.data);

            // Confirmar eliminación
            Ext.Msg.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar a <b>' + record.get('nombre') + '</b>?',
                function (button) {
                    if (button === 'yes') {
                        me.deleteUser(record);
                    }
                }
            );
        },

        /**
         * Ejecuta la petición DELETE
         */
        deleteUser: function (record) {
            var me = this,
                grid = me.getView(),
                id = record.get('id');

            console.log('📤 DELETE - Eliminando usuario ID:', id);

            // Mostrar loading
            grid.setLoading('Eliminando...');

            // Hacer la petición DELETE
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/users/' + id,
                method: 'DELETE',
                success: function (response) {
                    console.log('✅ Usuario eliminado exitosamente');

                    grid.setLoading(false);
                    Ext.Msg.alert('Éxito', 'Usuario eliminado correctamente');

                    // Recargar el grid
                    me.onReload();
                },
                failure: function (response) {
                    console.error('❌ Error al eliminar usuario:', response);
                    grid.setLoading(false);
                    Ext.Msg.alert('Error', 'No se pudo eliminar el usuario: ' + response.statusText);
                }
            });
        },

        /**
         * LEER - Método GET
         * Recarga los datos del servidor
         */
        onReload: function () {
            var grid = this.getView(),
                store = grid.getStore();

            console.log('📥 GET - Recargando datos desde el servidor');

            // Limpiar filtros de búsqueda
            store.clearFilter();

            // Recargar el store (hace una petición GET)
            store.load({
                callback: function (records, operation, success) {
                    if (success) {
                        console.log('✅ Datos recargados correctamente:', records.length, 'registros');
                    } else {
                        console.error('❌ Error al recargar datos');
                    }
                }
            });
        },

        /**
         * BUSCAR - Filtrado local
         * Filtra los datos que ya están en el grid
         */
        onSearch: function (field) {
            var grid = this.getView(),
                store = grid.getStore(),
                searchValue = field.getValue();

            console.log('🔍 Buscando:', searchValue);

            // Limpiar filtros anteriores
            store.clearFilter();

            if (searchValue) {
                // Filtrar por nombre o email
                store.filter([
                    {
                        filterFn: function (record) {
                            var nombre = record.get('nombre').toLowerCase(),
                                email = record.get('email').toLowerCase(),
                                search = searchValue.toLowerCase();

                            return nombre.indexOf(search) > -1 || email.indexOf(search) > -1;
                        }
                    }
                ]);
            }
        }
    }
});
