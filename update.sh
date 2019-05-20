#!/bin/bash
git clone https://github.com/merkelAlbert/TechnicApp ../temp/
rm -rf ../TechnicApp/
mkdir ../TechnicApp
mv ../temp/.git ../TechnicApp
mv ../temp/.gitignore ../TechnicApp
mv ../temp/.dockerignore ../TechnicApp
mv ../temp/* ../TechnicApp
rm -rf ../temp/
systemctl stop technic.service
systemctl start technic.service


