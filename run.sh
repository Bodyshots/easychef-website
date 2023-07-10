#!/bin/bash
./manage.py runserver &
cd reactapp || (echo "Error in script - Missing reactapp folder" && exit)
npm start