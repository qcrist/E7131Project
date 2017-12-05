# Let's Face It Version 1.0

### Release Notes: Version 1.0 
##### New Features
* Added ability to register as a new user and login
* Added ability to create groups
* Added ability for group owners to add and remove members
* Added ability to join/leave existing public groups
* Added 2 games that allow users to quiz themselves on their group members
	* One game asks the user to match names to faces
	* Second game asks the user to match faces to names

##### Bug Fixes
* Cancel button when adding a new member on the Group Editor page no longer brings user to the Add New User page
* Same user is no longer allowed to register twice
* After data is stored and loaded, users are no longer duplicated

##### Known Bugs and Defects
* Pressing enter on login page brings user to registration page
* “Remember Me” feature not implemented
* “Forgot Password” feature not implemented
* Can’t update profile picture or password after registering
* Private groups not actually private

--------------------

### Install Guide: Version 1.0
##### Pre-requisites
* You must have Nodejs installed and configured before proceeding. See https://nodejs.org/en/download/

##### Dependencies
* Navigate to the project directory in a command prompt then run the following commands:
	* npm install
	* npm install -g typescript

##### Download

* Download source from: https://github.com/qcrist/E7131Project

##### Build
* Navigate to the project directory in a command prompt then run the following commands:
	* tsc
	* cd server
	* tsc 

##### Installation
* Project is installed in the source directory
* All files are required, so just move the project directory to the desired location

##### Running Application
* Navigate to the project directory in a command prompt then run the following commands:
	* cd server
	* node index.js

##### Troubleshooting
* Nodejs needs to be installed on the path
* ‘npm install -g typescript’ might require root/admin access depending on OS
* Make sure you install the dependencies
* Try deleting node_modules in the project directory and rerun the dependency commands
