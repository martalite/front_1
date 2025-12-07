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

    fields: [
        'id',
        'nombres',
        'apellidos',
        'edad',
        'sexo',
        'direccion',
        'ciudad',
        'pais',
        'cargo',
        'nivelEstudios',
        'email'
    ],


    
    // Validaciones (opcional pero recomendado)
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
