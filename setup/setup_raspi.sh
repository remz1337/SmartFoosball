#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove
sudo apt-get -qy install xscreensaver

#Then disable screen saver from Menu-->Preferences-->Display Mode

#Deploy sensor script to crontab
##crontab -e
##@reboot python3 /home/pi/source/repos/SmartFoosball/sensors/foosball.py &

#auto start chromium to localhost 
##sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
##/usr/bin/chromium-browser --kiosk --disable-restore-session-state http://localhost
