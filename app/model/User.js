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

Ext.define('App.model.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'apellido', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'sexo', type: 'string' },
        { name: 'direccion', type: 'string' },
        { name: 'ciudad', type: 'string' },
        { name: 'pais', type: 'string' },
        { name: 'cargo', type: 'string' },
        { name: 'nivelEstudios', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'perfilId', type: 'int' }
    ]
});
