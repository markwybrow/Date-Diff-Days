# Date-Diff-Days

## Overview
This application is running a basic node server where we are creating a task to find the difference in days between two dates not including the days referenced. 
### The rules for this task are:
* create the application's logic without using the native javascript Date() object
* or any other language's inbuilt date methods.
* do not use any frameworks - vanilla JS
* NB:  Currently for Demo purposes I have resticted start year to 1900 and onwards - will eventually be adjustable via param setting dot.env

## Api Deployment
* Download Current repository - by opening a terminal window
```shell
mkdir test && cd test
git clone https://github.com/markwybrow/Date-Diff-Days.git
cd Date-Diff-Days
```
* Install node module dependencies
```shell
npm i
```
* Run bundler 'Browserfiy' this will allow the ES6 modules to be compiled into one JS file
```shell
npm run build
```
* Start application with cmd
```shell
npm start
```
* Open in preferred browser at "http://localhost:7000"

### Tests
Mocha / Chai tests can be run by opening a terminal window at the root level of the application - all tests can be viewed in the root ./test directory ... WIP
```shell
npm run test
```

## Technology Stack
* Angular 4
* NodeJS 6 with express 4.0 framework using modules request-promise as the transport for crafted requests.
* Docker
* Node Class in lib/index.js
* Failover logic handled in routes/index.js is simulated by altering the Mailgun domain to blah.Mailgun.net (an unreachable sub domain) from api.Mailgun.net

## Architecture
* Application port is on 7000 via node express framework.
* You will require node to install application

### Tech Stack Used
* ES6 
* Babel, Browserify,
* NodeJS 6 with express 4^ framework using modules 
* Docker can be applied if required
* please review the package.json for more information


contact: mark.wybrow@hotmail.com

