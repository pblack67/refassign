# Refassign

## Application Deployed on Heroku

[https://refassign.herokuapp.com/](https://refassign.herokuapp.com/)

## Video Demonstration

[https://youtu.be/5G23B7iB4gs](https://youtu.be/5G23B7iB4gs)

### To run the application:

* npm start

### Technologies used: 

* JavaScript
* Modules
* Node
* Express
* Handlebars
* MVC
* Sequelize
* MySql
* Nodemailer
* Many-to-many database relationship

## Overview

 This is a simple referee assignment system for high school sports referees. It was designed to have a better look and feel than the existing monopoly in the assigning space, Arbiter. 
 
 The application has two basic roles: Admin and Referee. The Admin role maintains the list of available referees and games. It also defines the assignment of referees to games. Each referee only can only be assigned to one game a day which may affect the list of available referees. Each game has a required number of referees associated with it. Once that number of referees has been assigned the list of available referees is blank. When a referee is assigned to a game they get an email notifying them of the time, place and sport of their game.

 The referee role has one basic page which lists the referee's assigned games. It allows them a read-only view of their schedule to see where/when they need to be.

## Architecture

This application is a Node/Express application with a full HTML front-end using the MVC framework. The back-end database is MySQL with Sequelize as an ORM. An interesting thing to note is the many-to-many database relationship between referees and games. Each referee may be assigned to multiple games. Conversely, each game may have multiple referees. This was easily implemented via Sequelize and its "through" clause on the belongsToMany association. The helper functions it generates handle inserting into the many-to-many relationship table. 

The tables and repeated elements in the HTML pages were generated using the Handlebars template library. HTML and API controllers handle their respective routes. Some API routes were useful for testing purposes more so than for production. 

The Nodemailer package was used to easily send emails to users about new assignments. A new refassign gmail account was created for this purpose. The secure email port was needed in order to successfully work on Heroku. 

## Future Development

There are many areas for future development including:

* Abstracting out the schools into their own table
* Abstracting out the sports into their own table
* Associate sports with referees so that they can only be assigned to sports they're licensed in
* More intelligent detection of availablity (allowing more than one game on each day if there's sufficient time on each side of an assignment)
* Allowing the referee to block off various times of day that they are not available
* Allowing the referee to assign themselves to games if a game is designated as such