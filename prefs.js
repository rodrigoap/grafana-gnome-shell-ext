const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
const Gdk = imports.gi.Gdk;
const GLib = imports.gi.GLib;
const Extension = imports.misc.extensionUtils.getCurrentExtension();

var Fields = {
    API_URL           : 'api-url',
    API_KEY           : 'api-key',
    DASH_IDS           : 'dash-ids'
}

const SCHEMA_NAME = 'org.gnome.shell.extensions.grafana';

const getSchema = function () {
    let schemaDir = Extension.dir.get_child('schemas').get_path();
    let schemaSource = Gio.SettingsSchemaSource.new_from_directory(schemaDir, Gio.SettingsSchemaSource.get_default(), false);
    let schema = schemaSource.lookup(SCHEMA_NAME, false);

    return new Gio.Settings({ settings_schema: schema });
};

var SettingsSchema = getSchema();

const App = class SystemMonitor_App {
    constructor() {
        this.main_vbox = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL,
            spacing: 10
            //border_width: 10
        });
        this.hbox1 = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 20
            //border_width: 10
        });
        let labelURL = new Gtk.Label({ label: "Grafana API URL:" });
        this.hbox1.add(labelURL);
        this.entryURL = new Gtk.Entry ({hexpand:true});
        this.hbox1.add(this.entryURL);

        let labelAPIKey = new Gtk.Label({ label: "Grafana API Key:" });
        this.hbox1.add(labelAPIKey);
        this.entryAPIKey = new Gtk.Entry ({hexpand:true});
        this.hbox1.add(this.entryAPIKey);

        let labelDashIds = new Gtk.Label({ label: "Dashboards id:" });
        this.hbox1.add(labelDashIds);
        this.entryDashIds = new Gtk.Entry ({hexpand:true});
        this.hbox1.add(this.entryDashIds);

        this.main_vbox.pack_start(this.hbox1, false, false, 0);

        SettingsSchema.bind(Fields.API_URL, this.entryURL, 'text', Gio.SettingsBindFlags.DEFAULT);
        SettingsSchema.bind(Fields.API_KEY, this.entryAPIKey, 'text', Gio.SettingsBindFlags.DEFAULT);
        SettingsSchema.bind(Fields.DASH_IDS, this.entryDashIds, 'text', Gio.SettingsBindFlags.DEFAULT);

        this.main_vbox.show_all();
    }
}

function init() {
}

function buildPrefsWidget() {
    let widget = new App();
    return widget.main_vbox;
}