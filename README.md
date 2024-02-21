# employee-app

npm init inside the folder where you store the app so the node modules set up, just click through and set procedures as thou wilt

to install the needed packages
npm i nodemon  rxjs cors express mongoose 

set up mongoose (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

make a database labeled CrudDB, have the collectioned be labeled employees

(Might have to make a .bat file, open up in notepad and save the file as startMongoDb.bat, put the following in the file, using your own machine paths to the database's mongo data 
the pause just waits for a click before the program shuts)


____
cd C:\Program Files\MongoDB\Server\5.0\bin
mongod.exe --dbpath C:\Users\[userName]\Documents\mongo-data

:pause
____
save that file somewhere, and right click run as administrator to start it, then start mongodb
so now
nodemon db.js will start the database

 ----- FRONT END -------
to open the angular app https://angular.io/guide/setup-local
google how to install angular
npm install -g @angular/cli (to install angular globably)

ng new AngularApp

cd AngularApp in the tsconfig.json file, add " "strictPropertyInitialization": false " to the angularcompileroptions

ng generate component [componentname] generates a component, componentname, which will be employee this time so..

ng g component employee (g is short for generate)

ng serve --open

this starts the front end
