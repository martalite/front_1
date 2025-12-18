Ext.define('App.view.pacientes.PacientesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pacientesgrid',

    requires: [
        'App.view.pacientes.PacienteWindow',
    ],    
    
    title: 'Pacientes',

    store: {
        type: 'pacientes'
    },

    // =========================
    // TOOLBAR
    // =========================
    tbar: [
        {
            text: 'Nuevo',
            iconCls: 'x-fa fa-plus',
            handler: function () {
                Ext.create('App.view.pacientes.PacienteWindow').show();
            }
        },
        {
            text: 'Editar',
            iconCls: 'x-fa fa-edit',
            handler: function () {
                const grid = this.up('grid');
                const record = grid.getSelection()[0];

                if (!record) {
                    Ext.Msg.alert('Atención', 'Seleccione un paciente');
                    return;
                }

                Ext.create('App.view.pacientes.PacienteWindow', {
                    record: record
                }).show();
            }
        },
        {
            text: 'Eliminar',
            iconCls: 'x-fa fa-trash',
            handler: function () {
                const grid = this.up('grid');
                const record = grid.getSelection()[0];

                if (!record) {
                    Ext.Msg.alert('Atención', 'Seleccione un paciente');
                    return;
                }

                Ext.Msg.confirm('Confirmar', '¿Eliminar paciente?', function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: 'http://localhost:8080/api/pacientes/' + record.get('id'),
                            method: 'DELETE',
                            success: function () {
                                Ext.getStore('pacientesStore').reload();
                            },
                            failure: function () {
                                Ext.Msg.alert('Error', 'No se pudo eliminar');
                            }
                        });
                    }
                });
            }
        }
    ],

    // =========================
    // COLUMNAS
    // =========================
    columns: [
        { text: 'NUHSA', dataIndex: 'nuhsa', width: 120 },
        { text: 'Código TAO', dataIndex: 'codigoTao', width: 120 },
        { text: 'SIP2', dataIndex: 'sip2', width: 100 },
        { text: 'Nombre', dataIndex: 'nombre', flex: 1 },
        { text: 'Primer Apellido', dataIndex: 'primerApellido', flex: 1 },
        { text: 'Segundo Apellido', dataIndex: 'segundoApellido', flex: 1 },
        { text: 'DNI', dataIndex: 'dni', width: 120 },

        {
            text: 'Centro',
            dataIndex: 'centro',
            flex: 1,
            renderer: function (value) {
                return value ? value.nombre : '';
            }
        },

        {
            text: 'Modalidad',
            dataIndex: 'modalidadControl',
            width: 160,
            align: 'center',
            renderer: function (value) {
                let color = '#999';

                switch (value) {
                case 'Ingreso':
                    color = '#e74c3c'; // rojo
                    break;
                case 'Telemedicina':
                    color = '#2ecc71'; // verde
                    break;
                case 'Seguimiento':
                    color = '#f39c12'; // naranja
                    break;
                case 'Ambulatorio':
                    color = '#3498db'; // azul
                    break;
        }

            return `
                <span style="
                    background:${color};
                    color:white;
                    padding:4px 10px;
                    border-radius:12px;
                    font-weight:bold;
                    font-size:12px;
                    display:inline-block;
                    min-width:110px;
            ">
                ${value}
            </span>
        `;
    }
}

    ],

    // =========================
    // DOBLE CLICK = EDITAR
    // =========================
    listeners: {
        itemdblclick: function (grid, record) {
            Ext.create('App.view.pacientes.PacienteWindow', {
                record: record
            }).show();
        }
    }
});
