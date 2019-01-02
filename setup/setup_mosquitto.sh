#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove

sudo apt-get -qy install mosquitto
#CREATE ACL to prevent unwanted publisher
