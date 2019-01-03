#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove

sudo apt-get -qy install mosquitto
#sudo ufw allow 1883
sudo cp mosquitto_passwd.txt /etc/mosquitto/passwd
sudo cp mosquitto.acl /etc/mosquitto/acl
sudo cp mosquitto.conf /etc/mosquitto/conf.d/default.conf
sudo systemctl reload mosquitto
sleep 2
sudo systemctl restart mosquitto
sleep 1
#CREATE ACL to prevent unwanted publisher
