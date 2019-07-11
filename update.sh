#!/bin/bash
systemctl stop technic.service
git clone https://github.com/merkelAlbert/TechnicApp ../temp/
rm -rf ../TechnicApp/
mkdir ../TechnicApp
mv ../temp/.git ../TechnicApp
mv ../temp/.gitignore ../TechnicApp
mv ../temp/.dockerignore ../TechnicApp
mv ../temp/* ../TechnicApp
rm -rf ../temp/
systemctl start technic.service


