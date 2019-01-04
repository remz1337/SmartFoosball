#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove

#Inspired from https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
sudo apt-get -qy install nodejs npm
sudo npm install -g mqtt
sudo npm install -g pg
sudo npm install -g pm2
pm2 start ../backend/logger.js
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u smartfoosball --hp /home/smartfoosball
