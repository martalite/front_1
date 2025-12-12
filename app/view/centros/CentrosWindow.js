Ext.define('App.view.centros.CentrosWindow', {
    extend: 'Ext.window.Window',
    xtype: 'centroswindow',

    title: 'Gestionar Centros',
    modal: true,
    width: 720,
    height: 420,
    layout: 'hbox',

    config: {
        userRecord: null
    },

    initComponent: function () {
        const me = this;

        // ===== STORE DISPONIBLES =====
        me.storeDisponibles = Ext.create('Ext.data.Store', {
            fields: ['id', 'nombre'],
            proxy: {
                type: 'ajax',
                url: 'http://localhost:8080/api/centros',
                reader: { type: 'json' }
            },
            autoLoad: true
        });

        // ===== STORE ASIGNADOS =====
        me.storeAsignados = Ext.create('Ext.data.Store', {
            fields: ['id', 'nombre']
        });

        // ===== GRID DISPONIBLES =====
        me.gridDisponibles = Ext.create('Ext.grid.Panel', {
            title: 'Centros disponibles',
            flex: 1,
            margin: 10,
            store: me.storeDisponibles,
            selModel: { selType: 'checkboxmodel', mode: 'MULTI' },
            columns: [{ text: 'Nombre', dataIndex: 'nombre', flex: 1 }]
        });

        // ===== GRID ASIGNADOS =====
        me.gridAsignados = Ext.create('Ext.grid.Panel', {
            title: 'Centros asignados',
            flex: 1,
            margin: 10,
            store: me.storeAsignados,
            selModel: { selType: 'checkboxmodel', mode: 'MULTI' },
            columns: [{ text: 'Nombre', dataIndex: 'nombre', flex: 1 }]
        });

        // ===== CARGA INICIAL =====
        me.storeDisponibles.on('load', function () {
            const user = me.getUserRecord();
            const idsAsignados = user.get('centrosIds') || [];

            const disponibles = [];
            const asignados = [];

            me.storeDisponibles.each(function (rec) {
                if (idsAsignados.includes(rec.get('id'))) {
                    asignados.push(rec);
                } else {
                    disponibles.push(rec);
                }
            });

            me.storeDisponibles.removeAll();
            me.storeAsignados.removeAll();

            me.storeDisponibles.add(disponibles);
            me.storeAsignados.add(asignados);
        });

        // ===== LAYOUT =====
        me.items = [
            me.gridDisponibles,
            {
                xtype: 'container',
                width: 60,
                layout: { type: 'vbox', pack: 'center', align: 'center' },
                items: [
                    {
                        xtype: 'button',
                        text: '→',
                        width: 40,
                        handler: function () {
                            me.move(me.gridDisponibles, me.storeDisponibles, me.storeAsignados);
                        }
                    },
                    {
                        xtype: 'button',
                        text: '←',
                        width: 40,
                        margin: '10 0 0 0',
                        handler: function () {
                            me.move(me.gridAsignados, me.storeAsignados, me.storeDisponibles);
                        }
                    }
                ]
            },
            me.gridAsignados
        ];

        // ===== BOTONES =====
        me.buttons = [
            {
                text: 'Guardar',
                handler: function () {
                    const user = me.getUserRecord();
                    const ids = [];

                    me.storeAsignados.each(rec => ids.push(rec.get('id')));

                    Ext.Ajax.request({
                        url: 'http://localhost:8080/api/users/' + user.get('id'),
                        method: 'PUT',
                        jsonData: Ext.apply({}, user.data, {
                            centrosIds: ids
                        }),
                        success: function () {

                            // 🔥 ACTUALIZAR RECORD LOCAL
                            user.set('centrosIds', ids);
                            user.commit();

                            Ext.Msg.alert('OK', 'Centros actualizados correctamente');
                            me.close();
                        },
                        failure: function () {
                            Ext.Msg.alert('Error', 'No se pudieron actualizar los centros');
                        }
                    });
                }
            },
            {
                text: 'Cancelar',
                handler: function () {
                    me.close();
                }
            }
        ];

        me.callParent();
    },

    // ===== MÉTODO DE MOVER =====
    move: function (grid, fromStore, toStore) {
        const selected = grid.getSelectionModel().getSelection();
        fromStore.remove(selected);
        toStore.add(selected);
    }
});
