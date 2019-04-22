#!/bin/sh

#Update
sudo apt-get -qy update
sudo apt-get -qy upgrade
sudo apt-get -qy autoremove

#INSTALL POSTGRESQL + ACCOUNT?
sudo apt-get -qy install postgresql postgresql-contrib
sleep 2
#sudo -u postgres createuser smartfoosball
#ALSO NEED TO CHANGE pg_hba.conf to allow connection from app with password (TEMPORARY SOLUTION)
sudo -i -u postgres psql -c "CREATE USER smartfoosball WITH PASSWORD 'password123';"
sudo -u postgres createdb smartfoosball
#User should be created manually before installing anything
#follow this tutorial: https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart
#sudo adduser --disabled-password --gecos "" smartfoosball
sudo -u smartfoosball psql smartfoosball -f model.sql
