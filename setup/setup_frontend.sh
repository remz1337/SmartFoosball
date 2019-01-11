#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove
sudo apt-get -qy install nginx

sudo cp nginx.conf /etc/nginx/sites-available/default
