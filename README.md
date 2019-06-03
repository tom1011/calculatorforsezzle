# Live Calculator 

Live Calculator is an app that does basic math calculations  and displays the last 10 problems in real time between different users.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Installing

* Run npm install
* start postgres if not running already by using brew serves start postgresql
* run database.sql in postgressql.
* go to 
* go to App.js line 21 and change route to http://localhost:8000/ (you can use what every port you want)
* do the same to socektio.js change route to http://localhost:8000/ (just keep the ports constant)
* Run npm run server
* Run npm run client
* navigate to localhost:3000

## Deployment

1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
7. In the deploy section, select manual deploy


## Built With

* react
* node.js
* SQL
* socket.io
* socket.io-client
* mathjs

## Authors

* **David Friday** - *\work* - [tom1011](https://github.com/tom1011)

## Acknowledgments

* Hat tip to anyone whose code was used
* The Net Ninja whos YouTube tutorial for socket.io helped a lot.
