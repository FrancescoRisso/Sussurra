## Sussurra
React-made website to play the game Sussurra
You are currently in the original code branch, if you want the full code please visit the code branch

## Install
### Clone repository
`git clone -b build https://github.com/FrancescoRisso/Sussurra.git`

### Setup nginx
`sudo apt install nginx`

It is the web server that will serve the static files (the React app)

All the configuration is in `/etc/nginx/`

You have all the available sites in `./sites-available/` and all the active sites in `./sites-enable`

If this is the first nginx config, you should delete "default" from this last folder: `sudo rm /etc/nginx/sites-enabled/default`

Create your nginx config file with `sudo nano /etc/nginx/sites-available/sussurra.nginx`

Write the file using this template (step by step explanation later):
```
server {
	listen 80;
	root /home/ssr/Sussurra;
	index index.html;
	
	location /static {
		expires 1y;
		add_header Cache-Control "public";
	}
	
	location / {
		try_files $uri $uri/ /index.html;
		add_header Cache-Control "no-cache";
	}
}
```
Link the file you created to the `./sites-enable` folder using

`cd /etc/nginx/sites-enabled/`

`sudo ln -s ../sites-available/sussurra.nginx sussurra.nginx`

Reload the service with `sudo systemctl reload nginx`


### Setup node
This is the server that will run the backend of the website

```
sudo apt install nodejs
sudo apt install npm
npm install ws moment express http underscore
sudo mkdir /var/log/Sussurra
sudo touch /var/log/Sussurra/log.log /var/log/Sussurra/error.log
```

We have to set it to automatically open, so we set it as a service

Create a new service file using  `sudo nano /etc/systemd/system/sussurraServer.service`

Write the file using this template:
```
[Unit]
Description=Sussura websocket server
After=network.target

[Service]
User=ssr
WorkingDirectory=/home/ssr/Sussurra/
ExecStart=node server.js 
Restart=always
StandardOutput=append:/var/log/Sussurra/log.log
StandardError=append:/var/log/Sussurra/error.log

[Install]
WantedBy=multi-user.target
```
Reload systemctl with `sudo systemctl daemon-reload`

Activate your process with `sudo systemctl start sussurraServer.service`

If you have to modify the server, just remember to run `sudo systemctl reload sussurraServer.service` to reload it
