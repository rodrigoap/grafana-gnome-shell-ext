# grafana-gnome-shell-ext

Display alarm state

<p>Three alarms OK</p>
<img src="images/grafanaAlertOK.png"/>

<p>One alarm Pending, two OK</p>
<img src="images/grafanaAlertPending.png"/>

---

## Installation

Clone the repository to the gnome extensions directory

<code>
> git clone https://github.com/rodrigoap/grafana-gnome-shell-ext.git ~/local/share/gnome-shell/extensions/grafana@rodrigoap.com
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
