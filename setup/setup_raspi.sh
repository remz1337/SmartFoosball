#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove
sudo apt-get -qy install xscreensaver

#Then disable screen saver from Menu-->Preferences-->Display Mode
