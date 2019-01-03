#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove

#INSTALL POSTGRESQL + ACCOUNT?
sudo apt-get -qy install postgresql postgresql-contrib
sleep 2
sudo -u postgres createuser smartfoosball
sudo -u postgres createdb smartfoosball
sudo adduser --disabled-password --gecos "" smartfoosball
sudo -u smartfoosball psql smartfoosball -f model.sql
