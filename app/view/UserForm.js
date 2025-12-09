Ext.define('FRONT_1.view.UserForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.userform',

    title: 'Usuario',
    modal: true,
    width: 400,
    layout: 'fit',

    isEdit: false,
    record: null,

    initComponent: function () {
        var me = this;

        if (me.isEdit) me.title = 'Editar Usuario';
        else me.title = 'Nuevo Usuario';

        me.items = [{
            xtype: 'form',
            reference: 'userForm',
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                allowBlank: false,
                margin: '0 0 12 0'
            },

            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'ID',
                    name: 'id',
                    hidden: !me.isEdit
                },
                { fieldLabel: 'Nombre', name: 'nombre' },
                { fieldLabel: 'Email', name: 'email', vtype: 'email' },
                {
                    fieldLabel: 'Edad',
                    name: 'edad',
                    xtype: 'numberfield',
                    minValue: 1,
                    maxValue: 120
                }
            ]
        }];

        me.buttons = [
            {
                text: 'Cancelar',
                handler: () => me.close()
            },
            {
                text: 'Guardar',
                formBind: true,
                handler: () => me.saveUser()
            }
        ];

        me.callParent(arguments);

        if (me.isEdit && me.record) {
            me.down('form').getForm().loadRecord(me.record);
        }
    },

    // =======================================================
    // 🔹 GUARDAR USUARIO
    // =======================================================
    saveUser: function () {
        var me = this,
            form = me.down('form').getForm();

        if (!form.isValid()) {
            Ext.Msg.alert('Validación', 'Complete los campos obligatorios.');
            return;
        }

        var values = form.getValues();
        me.setLoading(true);

        if (me.isEdit) me.updateUser(values);
        else me.createUser(values);
    },

    // =======================================================
    // 🔹 CREAR (POST)
    // =======================================================
    createUser: function (values) {
        var me = this;

        Ext.Ajax.request({
            url: 'http://localhost:8080/api/users',
            method: 'POST',
            jsonData: values,

            success: () => {
                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Usuario creado.', () => {
                    me.fireEvent('usersaved');
                    me.close();
                });
            },

            failure: (response) => {
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo crear: ' + response.statusText);
            }
        });
    },

    // =======================================================
    // 🔹 ACTUALIZAR (PUT)
    // =======================================================
    updateUser: function (values) {
        var me = this,
            id = me.record.get('id');

        values.id = id; // obligatorio

        Ext.Ajax.request({
            url: 'http://localhost:8080/api/users/' + id,
            method: 'PUT',
            jsonData: values,

            success: () => {
                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Usuario actualizado.', () => {
                    me.fireEvent('usersaved');
                    me.close();
                });
            },

            failure: (response) => {
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo actualizar: ' + response.statusText);
            }
        });
    }
});
