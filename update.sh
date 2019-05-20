#!/bin/bash
git clone https://github.com/merkelAlbert/TechnicApp ../temp/
rm -rf ../TechnicApp/
mkdir ../TechnicApp
mv ../temp/.* ../TechnicApp/
mv ../temp/* ../TechnicApp/
rm -rf ../temp/
