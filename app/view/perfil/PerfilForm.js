Ext.define('App.view.perfil.PerfilForm', {
    extend: 'Ext.window.Window',
    xtype: 'perfilform',

    title: 'Editar Perfil',
    modal: true,
    width: 400,
    layout: 'fit',
    resizable: false,

    config: {
        isEdit: false
    },

    items: [{
        xtype: 'form',
        bodyPadding: 15,
        defaults: {
            anchor: '100%',
            allowBlank: false
        },

        items: [
            {
                xtype: 'textfield',
                name: 'nombre',
                fieldLabel: 'Nombre'
            },
            {
                xtype: 'textarea',
                name: 'descripcion',
                fieldLabel: 'Descripción'
            }
        ],

        buttons: [
            {
                text: 'Guardar',
                formBind: true,
                handler: function (btn) {
                    var win = btn.up('window');
                    var form = btn.up('form');
                    var record = form.getRecord();
                    var values = form.getValues();

                    record.set(values);

                    Ext.Ajax.request({
                        url: 'http://localhost:8080/api/perfiles/' + record.get('id'),
                        method: 'PUT',
                        jsonData: record.getData(),

                        success: function () {
                            Ext.Msg.alert('OK', 'Perfil actualizado');
                            win.close();
                            Ext.getStore('perfilesStoreId').reload();
                        },

                        failure: function () {
                            Ext.Msg.alert('Error', 'No se pudo actualizar el perfil');
                        }
                    });
                }
            },
            {
                text: 'Cancelar',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }
        ]
    }]
});
