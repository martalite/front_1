Ext.define('App.view.pacientes.PacienteWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pacientewindow',

    requires: [
        'App.view.pacientes.PacienteForm'
    ],

    title: 'Paciente',
    modal: true,
    layout: 'fit',
    width: 450,

    config: {
        record: null
    },

    items: [
        {
            xtype: 'pacienteform'
        }
    ],

    listeners: {
        show: function (win) {
            const record = win.getRecord();
            if (!record) return;

            win.setTitle('Editar Paciente');

            const form = win.down('form').getForm();
            const data = record.getData();
            const comboCentro = win.down('combobox[name=centro]');
            const centrosStore = comboCentro.getStore();

            // Cargar valores simples
            form.setValues(data);

            // 🔥 Esperar a que el store cargue y luego asignar centro
            if (data.centro) {
                centrosStore.load({
                    callback: function () {
                        comboCentro.setValue(data.centro.id);
                    }
                });
            }
        }
    },

    buttons: [
        {
            text: 'Guardar',
            handler: function () {
                const win = this.up('window');
                const form = win.down('form').getForm();

                if (!form.isValid()) return;

                let values = form.getValues();
                values.centro = { id: values.centro };

                let url = 'http://localhost:8080/api/pacientes';
                let method = 'POST';

                if (win.getRecord()) {
                    url += '/' + win.getRecord().get('id');
                    method = 'PUT';
                }

                Ext.Ajax.request({
                    url: url,
                    method: method,
                    jsonData: values,
                    success: function () {
                        Ext.Msg.alert('OK', 'Paciente guardado');
                        win.close();
                        Ext.getStore('pacientesStore').reload();
                    },
                    failure: function () {
                        Ext.Msg.alert('Error', 'No se pudo guardar');
                    }
                });
            }
        },
        {
            text: 'Cancelar',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});
