const St = imports.gi.St;
const Main = imports.ui.main;
const Soup = imports.gi.Soup;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Prefs = Me.imports.prefs;

let API_URL = 'http://127.0.0.1:8888/alarms.json';
let API_KEY = '';
let DASH_IDS = '';

let _httpSession;
let LOG_TAG = "GrafanaGnomeExt> ";
let idbMenu;

const GrafanaGnomeExt = new Lang.Class({
		Name: 'GrafanaGnomeExt',
		Extends: PanelMenu.Button,

		_init: function () {
			this._loadSettings();
			this.parent(0.0, "Grafana Gnome Extension", false);
			this.buttonText = new St.Label({
				text: _("Loading..."),
				y_align: Clutter.ActorAlign.CENTER
			});
			this.actor.add_actor(this.buttonText);
			this._refresh();
		},

		_refresh: function () {
			this._loadData(this._refreshUI);
			this._removeTimeout();
			this._timeout = Mainloop.timeout_add_seconds(10, Lang.bind(this, this._refresh));
			return true;
		},

		_loadData: function () {
			_httpSession = new Soup.Session();
			let queryString = API_URL + "?" + DASH_IDS;
			//global.log(LOG_TAG + "queryString:" + queryString);
			let message = Soup.Message.new('GET', queryString);
			message.request_headers.append("Authorization", "Bearer " + API_KEY);
			_httpSession.queue_message(message, Lang.bind(this, function (_httpSession, message) {
                if (message.status_code !== 200) {
                    global.log(LOG_TAG + "message.status_code is " + message.status_code + ". URI: " + queryString);
					return;
                }
				let json = JSON.parse(message.response_body.data);
				//global.log(LOG_TAG + "json:" + JSON.stringify(json));
				this._refreshUI(json);
			}));
		},

		_refreshUI: function (data) {
			let alarmsInfo = new Map();
			for (var i = 0; i < data.length; i++) {
				alarmsInfo.set(data[i].id, data[i]);
				//global.log(LOG_TAG + "data.Id:" + data[i].id);
			}

			let alarmOkCount = 0;
			let alarmPendingCount = 0;
			let alarmAlertingCount = 0;

			for (const alarmDataEntry of alarmsInfo.entries()) {
				//global.log(LOG_TAG + "alarmDataEntry:" + JSON.stringify(alarmDataEntry));
				let alarmData = alarmDataEntry[1];
				//global.log(LOG_TAG + "alarmData:" + alarmData);
				switch (alarmData.state) {
					case 'ok':
						alarmOkCount++;
						break;
					case 'pending':
						alarmPendingCount++;
						break;
					case 'alerting':
						alarmAlertingCount++;
						break;	
					default:
						break;
				}
			}
			let className = 'ok-ind';
			if (alarmAlertingCount > 0) {
				className = 'alerting-ind';
			} else if (alarmPendingCount > 0) {
				className = 'pending-ind';
			}
			this.buttonText.set_text("| " + alarmAlertingCount + " | " + alarmPendingCount + " | " + alarmOkCount + " |");
            this.buttonText.set_style_class_name(className);
		},

		_removeTimeout: function () {
			if (this._timeout) {
				Mainloop.source_remove(this._timeout);
				this._timeout = null;
			}
		},

		stop: function () {
			if (_httpSession !== undefined)
				_httpSession.abort();
			_httpSession = undefined;

			if (this._timeout)
				Mainloop.source_remove(this._timeout);
			this._timeout = undefined;

			this.menu.removeAll();
		},

		_loadSettings: function () {
			this._settings = Prefs.SettingsSchema;
			this._settingsChangedId = this._settings.connect('changed', Lang.bind(this, this._onSettingsChange));			
			this._fetchSettings();
		},

		_fetchSettings: function () {
			API_URL = this._settings.get_string(Prefs.Fields.API_URL);
			API_KEY = this._settings.get_string(Prefs.Fields.API_KEY);
			let dashIds = this._settings.get_string(Prefs.Fields.DASH_IDS).split(',');
			var i = 0;
			DASH_IDS = '';
			for (; i < dashIds.length; i++) {
				DASH_IDS = DASH_IDS + "dashboardId=" + dashIds[i].trim() + "&";
			}
			if (i > 0) {
				DASH_IDS = DASH_IDS.substring(0, DASH_IDS.length - 1);
			}
		},

		_onSettingsChange: function () {
			var that = this;
			that._fetchSettings();
		}		
	}
);

function init() {
}

function enable() {
	idbMenu = new GrafanaGnomeExt;
	Main.panel.addToStatusArea('grafanaGnomeExtension', idbMenu);
}

function disable() {
	idbMenu.stop();
	idbMenu.destroy();
}
