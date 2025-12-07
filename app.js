/**
 * APLICACIÓN PRINCIPAL
 * 
 * Este archivo inicializa la aplicación ExtJS.
 * 
 * Aprenderás:
 * - Cómo inicializar una aplicación ExtJS
 * - Cómo crear el viewport principal
 * - La estructura básica de una app ExtJS
 */

// Habilitar el modo de desarrollo para ver mensajes detallados en consola
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

// Esperar a que el DOM esté listo
/**Ext.onReady(function () {

    console.log('%c📚 TUTORIAL EXTJS - CRUD CON REST API', 'font-size: 16px; color: #667eea; font-weight: bold;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
    console.log('%cEsta aplicación demuestra cómo hacer un CRUD completo con llamadas REST:', 'color: #555;');
    console.log('%c• CREATE (POST)   - Crear nuevo usuario', 'color: #28a745;');
    console.log('%c• READ (GET)      - Leer/listar usuarios', 'color: #17a2b8;');
    console.log('%c• UPDATE (PUT)    - Actualizar usuario existente', 'color: #ffc107;');
    console.log('%c• DELETE (DELETE) - Eliminar usuario', 'color: #dc3545;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
    console.log('%cAbre la Consola de Desarrollo para ver las peticiones HTTP', 'color: #888; font-style: italic;');
    console.log(' ');

    /**
     * Crear el viewport principal de la aplicación
     * El viewport es el contenedor principal que ocupa toda la pantalla
     */
    Ext.create('Ext.container.Viewport', {
        layout: 'fit',

        // Renderizar en nuestro contenedor personalizado
         renderTo: Ext.getBody(),
         width: 900,  // <---- añade esto
         height: 450,

               
        // Padding para separar del borde
        padding: 10,

        // Items: aquí va nuestro grid principal
        items: [
            {
                xtype: 'panel',
                layout: 'fit',
                border: false,
                items: [
                    {
                        // Nuestro grid de usuarios
                        xtype: 'usergrid'
                    }
                ],

                // Panel inferior con información didáctica
                bbar: {
                    xtype: 'toolbar',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'component',
                            html: '<div style="padding: 5px;">' +
                                '<b>💡 Información para Desarrolladores:</b><br/>' +
                                '<small>' +
                                '• Abre la <b>Consola de Desarrollo</b> (F12) para ver los logs de cada operación REST<br/>' +
                                '• Abre la pestaña <b>Network</b> para ver las peticiones HTTP en detalle<br/>' +
                                '• Revisa el código fuente en <b>app/</b> para entender cómo funciona cada componente' +
                                '</small>' +
                                '</div>'
                        }
                    ]
                }
            }
        ],

        // Listener cuando se renderiza el viewport
        listeners: {
            afterrender: function () {
                console.log('✅ Aplicación inicializada correctamente');
                console.log('📍 URL de la API configurada: http://localhost:8080/api/users');

                // Mostrar mensaje de bienvenida
                Ext.defer(function () {
                    Ext.create('Ext.window.Toast', {
                        title: '👋 ¡Bienvenido!',
                        html: 'Aplicación lista. Abre la Consola de Desarrollo (F12) para ver los detalles de cada operación REST.',
                        autoClose: true,
                        autoCloseDelay: 5000,
                        align: 'br',
                        slideInDuration: 400
                    });
                }, 500);
            }
        }
    
});

            Ext.application({
                name: 'FRONT_1',

                requires: [
                    'FRONT_1.view.UsersGrid'
           ],

           launch: function () {
              Ext.create({
                xtype: 'usersgrid',
                renderTo: Ext.getBody(),
                width: '80%',
                height: 450,
                padding: 10
        });
    }
});




/**
 * ═══════════════════════════════════════════════════════════════
 * GUÍA RÁPIDA DE USO:
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. LISTAR USUARIOS (GET):
 *    - Al cargar la página, automáticamente se hace una petición GET
 *    - URL: http://localhost:8080/api/users/search
 *    - Verás los datos en el grid
 * 
 * 2. CREAR USUARIO (POST):
 *    - Haz clic en "Nuevo Usuario"
 *    - Completa el formulario
 *    - Haz clic en "Guardar"
 *    - Se enviará una petición POST a: http://localhost:8080/api/users
 * 
 * 3. EDITAR USUARIO (PUT):
 *    - Haz doble clic en una fila del grid, o
 *    - Haz clic en el icono de editar (lápiz)
 *    - Modifica los datos
 *    - Haz clic en "Guardar"
 *    - Se enviará una petición PUT a: http://localhost:8080/api/users/{id}
 * 
 * 4. ELIMINAR USUARIO (DELETE):
 *    - Haz clic en el icono de eliminar (papelera)
 *    - Confirma la eliminación
 *    - Se enviará una petición DELETE a: http://localhost:8080/api/users/{id}
 * 
 * ═══════════════════════════════════════════════════════════════
 * ESTRUCTURA DEL PROYECTO:
 * ═══════════════════════════════════════════════════════════════
 * 
 * app/
 * ├── model/
 * │   └── User.js              → Define la estructura de datos
 * ├── store/
 * │   └── Users.js             → Configura las llamadas REST
 * └── view/
 *     ├── UserGrid.js          → Grid con listado y acciones
 *     └── UserForm.js          → Formulario para crear/editar
 * 
 * ═══════════════════════════════════════════════════════════════
 */
