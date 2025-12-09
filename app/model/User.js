/**
 * MODELO DE USUARIO
 * 
 * En ExtJS, un Model define la estructura de los datos.
 * Es como un "esquema" que describe qué campos tiene cada usuario.
 * 
 * Aprenderás:
 * - Cómo definir campos (fields) y sus tipos
 * - Cómo configurar el identificador único (idProperty)
 */

Ext.define('FRONT_1.model.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',  // 

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'sexo', type: 'string' },
        { name: 'direccion', type: 'string' },
        { name: 'ciudad', type: 'string' },
        { name: 'pais', type: 'string' },
        { name: 'cargo', type: 'string' },
        { name: 'nivelEstudios', type: 'string' },
        { name: 'email', type: 'string' }
    ],

    validators: {
        nombres: { type: 'presence', message: 'El nombre es obligatorio' },
        email: [
            { type: 'presence', message: 'El email es obligatorio' },
            { type: 'email', message: 'Email inválido' }
        ],
        edad: [
            { type: 'presence', message: 'La edad es obligatoria' },
            { type: 'range', min: 1, max: 120, message: 'Edad debe estar entre 1 y 120' }
        ]
    }
});

