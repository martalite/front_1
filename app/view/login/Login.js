Ext.define('App.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'loginwindow',

    title: 'Login',
    width: 320,
    modal: true,
    closable: false,
    autoShow: true,

    items: [{
        xtype: 'form',
        bodyPadding: 20,
        defaults: {
            anchor: '100%',
            allowBlank: false
        },
        items: [
            { xtype: 'textfield', name: 'username', fieldLabel: 'Usuario' },
            { xtype: 'textfield', name: 'password', fieldLabel: 'Contraseña', inputType: 'password' }
        ],
        buttons: [{
            text: 'Entrar',
            handler: function (btn) {
                var win = btn.up('window');
                win.close();

                Ext.create('App.view.MainView');
            }
        }]

    }]
});
