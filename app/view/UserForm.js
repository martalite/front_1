Ext.define('App.view.UserForm', {
    extend: 'Ext.window.Window',
    xtype: 'userform',

    title: 'Usuario',
    modal: true,
    width: 400,
    layout: 'fit',

    config: {
        isEdit: false,
        userId: null
    },

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            allowBlank: false
        },

        items: [
            { xtype: 'textfield', name: 'nombre', fieldLabel: 'Nombre' },
            { xtype: 'textfield', name: 'apellido', fieldLabel: 'Apellido' },
            { xtype: 'textfield', name: 'email', fieldLabel: 'Email', vtype: 'email' },
            { xtype: 'numberfield', name: 'edad', fieldLabel: 'Edad', minValue: 1 },

            {
                xtype: 'combo',
                fieldLabel: 'Perfil',
                name: 'perfilId',

                store: {
                    type: 'perfiles',
                    storeId: 'perfilesStoreId'
                },

                displayField: 'nombre',
                valueField: 'id',
                queryMode: 'local',

                forceSelection: true,
                editable: false,
                allowBlank: false,
                emptyText: 'Seleccione un perfil...'
            }
        ],

        buttons: [
            {
                text: 'Guardar',
                formBind: true,
                handler: function(btn) {
                    const win = btn.up('window');
                    const form = win.down('form');
                    const vals = form.getValues();
                    const isEdit = win.getIsEdit();
                    const userId = win.getUserId();

                    const method = isEdit ? 'PUT' : 'POST';
                    const url = isEdit
                        ? 'http://localhost:8080/api/users/' + userId
                        : 'http://localhost:8080/api/users';

                    Ext.Ajax.request({
                        url: url,
                        method: method,
                        jsonData: vals,

                        success: function() {
                            Ext.Msg.alert('OK', 'Usuario guardado correctamente');
                            win.close();
                            Ext.getStore('usersStoreId').reload();
                        },

                        failure: function(response) {
                            Ext.Msg.alert('Error', response.responseText || 'Error al guardar');
                        }
                    });
                }
            },
            {
                text: 'Cancelar',
                handler: function(btn) {
                    btn.up('window').close();
                }
            }
        ]
    }],

    listeners: {
        show: function(win) {

            if (win.getIsEdit()) {
                const form = win.down('form');
                const rec = Ext.getStore('usersStoreId').getById(win.getUserId());

                if (rec) {
                    form.loadRecord(rec);

                    form.down('combo[name=perfilId]')
                        .setValue(rec.get('perfilId'));
                }
            }
        }
    }
});
