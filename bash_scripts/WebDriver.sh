#!/bin/bash

/media/sysadmin/DRV4_VOL1_2ndPt1/simple_Utesting/node_modules/.bin/wdio wdio.conf.js

cp ./test/WebDriverIO_created/selenium_logs/selenium-standalone.txt ./test/WebDriverIO_created/selenium_logs/selenium-standalone_$(date +%m%d%H%M).txt

exit 0


#./node_modules/.bin/wdio wdio.conf.js --suite <suite name>  <-- to run a suite from command line
#  timestamp=$(date \"+%c\"); git commit -m \" npm commit at: $timestamp\" ;