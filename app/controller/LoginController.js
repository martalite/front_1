onLogin: function () {
    var view = this.getView();
    var form = this.lookupReference('loginForm');

    if (!form || !form.isValid()) {
        return;
    }

    var values = form.getValues();

    if (values.username === 'admin' && values.password === '1234') {

        view.close();

        // 🔥 CREAR DIRECTAMENTE EL VIEWPORT
        Ext.create('App.view.MainView');

    } else {
        Ext.Msg.alert('Error', 'Usuario o contraseña incorrectos');
    }
}

