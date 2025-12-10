/**
 * FORMULARIO DE USUARIO
 * Crear / Editar usuarios con validaciones
 */

Ext.define('FRONT_1.view.UserForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.userform',

    title: 'Usuario',
    modal: true,
    width: 500,
    layout: 'fit',

    isEdit: false,
    record: null,

    initComponent: function () {
        var me = this;

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
                { fieldLabel: 'Nombres', name: 'nombres' },
                { fieldLabel: 'Apellidos', name: 'apellidos' },
                { fieldLabel: 'Email', name: 'email', vtype: 'email' },
                {
                    fieldLabel: 'Edad',
                    name: 'edad',
                    xtype: 'numberfield',
                    minValue: 1,
                    maxValue: 120
                },
                { fieldLabel: 'Sexo', name: 'sexo', allowBlank: true },
                { fieldLabel: 'Dirección', name: 'direccion', allowBlank: true },
                { fieldLabel: 'Ciudad', name: 'ciudad', allowBlank: true },
                { fieldLabel: 'País', name: 'pais', allowBlank: true },

                // 🔥 COMBO DE ROL OBLIGATORIO
                {
                    xtype: 'combo',
                    fieldLabel: 'Rol *',
                    name: 'rolId',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    blankText: 'Debe seleccionar un rol',
                    store: {
                        type: 'store',
                        fields: ['id', 'nombre'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: 'http://localhost:8080/api/perfiles',
                            reader: { type: 'json' }
                        }
                    }
                }
            ]
        }];

        me.buttons = [
            { text: 'Cancelar', handler: () => me.close() },
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

    saveUser: function () {
        var me = this,
            form = me.down('form').getForm();

        if (!form.isValid()) {
            Ext.Msg.alert('Error', 'Complete todos los campos obligatorios');
            return;
        }

        var values = form.getValues();
        values.rolNombre = me.down('combo[name=rolId]').getRawValue(); // guardamos el nombre del rol

        me.setLoading(true);

        if (me.isEdit) me.updateUser(values);
        else me.createUser(values);
    },

    createUser: function (values) {
        var me = this;

        Ext.Ajax.request({
            url: 'http://localhost:8080/api/users',
            method: 'POST',
            jsonData: values,

            success: () => {
                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Usuario creado', () => {
                    me.fireEvent('usersaved');
                    me.close();
                });
            },
            failure: () => {
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo crear');
            }
        });
    },

    updateUser: function (values) {
        var me = this,
            id = me.record.get('id');

        values.id = id;

        Ext.Ajax.request({
            url: 'http://localhost:8080/api/users/' + id,
            method: 'PUT',
            jsonData: values,

            success: () => {
                me.setLoading(false);
                Ext.Msg.alert('Éxito', 'Usuario actualizado', () => {
                    me.fireEvent('usersaved');
                    me.close();
                });
            },
            failure: () => {
                me.setLoading(false);
                Ext.Msg.alert('Error', 'No se pudo actualizar');
            }
        });
    }
});
