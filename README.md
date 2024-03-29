# grafana-gnome-shell-ext

### A gnome shell extension to display Grafana alarms state

<p>Three alarms OK</p>
<img src="images/grafanaAlertOK.png"/>

<p>One alarm Pending, two OK</p>
<img src="images/grafanaAlertPending.png"/>

<p>One alarm Alarming, two OK</p>
<img src="images/grafanaAlertAlarming.png"/>

<p>Detailed list</p>
<img src="images/grafanaAlertItems.png"/>

---

## Installation

Clone the repository to the gnome extensions directory

<code>
> git clone https://github.com/rodrigoap/grafana-gnome-shell-ext.git ~/.local/share/gnome-shell/extensions/grafana@rodrigoap.com
</code>
<br><br>
<p>Launch gnome shell extension preferences</p>
<code>
> gnome-shell-extension-prefs
</code>
<br><br>
<p>Click on the cog button</p>
<img src="images/shellExt.png"/>
<br><br>
<p>Add configuration parameters</p>

**Grafana API URL**  
Complete URL to the API endpoint  
Required parameter  
Example: https://my-grafana-server/api/alerts

**Grafana API Key**  
Authorization API Key. [Grafana Authentication API](https://grafana.com/docs/grafana/latest/http_api/auth/)  
Optional parameter  

**Dashboards id**  
Comma separated list of dashboard IDs containing the alerts  
Required parameter  
Example: 33, 45

<br><br>
<p>Turn on the extension with the ON/OFF selector</p>

## References
[Developing my first Gnome Extension](https://medium.com/@baymac/using-sqlite-in-gnome-extension-c499661d9bd5)   
[Gnome shell: my first extension](http://smasue.github.io/gnome-shell-tw)   
[gjs Un-official Seed Documentation](https://www.roojs.org/seed/gir-1.2-gtk-3.0/gjs/index.html)   
[gnome-shell-system-monitor-applet](https://github.com/paradoxxxzero/gnome-shell-system-monitor-applet)   
