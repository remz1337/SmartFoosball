#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove

#Install python and sensor librairies
#from this tutorial https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
sudo apt-get install -y python-smbus
sudo apt-get install -y i2c-tools
sudo apt-get install python3-pip
sudo pip3 install --upgrade setuptools
pip3 install RPI.GPIO
pip3 install adafruit-blinka
pip3 install adafruit-circuitpython-vcnl4010
pip3 install adafruit-circuitpython-tca9548a
pip3 install paho-mqtt
