Ext.define('App.view.pacientes.PacienteForm', {
    extend: 'Ext.form.Panel',
    xtype: 'pacienteform',

    bodyPadding: 10,
    width: 400,
    defaults: {
        anchor: '100%',
        labelWidth: 120
    },

    requires: [
        'App.store.CentroStore',
        'App.store.ModalidadesStore'
    ],

    items: [
        {
            xtype: 'textfield',
            name: 'nuhsa',
            fieldLabel: 'NUHSA',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'nombre',
            fieldLabel: 'Nombre',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'primerApellido',
            fieldLabel: 'Primer Apellido'
        },
        {
            xtype: 'textfield',
            name: 'segundoApellido',
            fieldLabel: 'Segundo Apellido'
        },
        {
            xtype: 'textfield',
            name: 'dni',
            fieldLabel: 'DNI'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Centro',
            name: 'centro',

            store: 'centrosStore',

            displayField: 'nombre',
            valueField: 'id',

            queryMode: 'local',
            editable: false,
            forceSelection: true,
            allowBlank: false,
            emptyText: 'Seleccione un centro...'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Modalidad Control',
            name: 'modalidadControl',

            store: 'modalidadesStore',

            displayField: 'nombre',
            valueField: 'id',

            queryMode: 'local',
            editable: false,
            forceSelection: true,
            allowBlank: false,

            emptyText: 'Seleccione modalidad...'
        }

    ]
});
