# Crazy Car Rental- Fergal Hughes 

This is a full stack car rental application built using React, Node.js, Express, bootstrap and MySql.
The system allows a customer to register, login, browse cars and make rental bookings.

## Project Approach
The project was designed in the database first using MySQL.I wanted to ensure that the relationships between the entities were clearly defined from the start. The database consists of 4 main entities customers, cars, car_model and rentals.It also consists of other entities like car_cleaning and car_technician and car_inspection but these were really for future enhancements. The ERD was created using Lucid chart to define the primary keys, foreign keys and relationships.The rentals table acts as a junction entity linking customers and cars with one-to-many relationships used throughout.

See ERD folder and Screenshots

## Back end Development

A Node.js and Express server were created to the Rest API endpoints.The API handles customer registration, login,
car and rental creation.The server side validation is implemented to ensure the required fields are provided to prevent duplicated entries by a user.The back end communicates with the MySQL database using queries.

## Front end Development
The front end was build using React and React Router.The application consists of multiple pages from Home,Login,Register etc. Axios is used to communicate with the back end API.Client side validation is implemented for forms that including date validation for bookings so a user cant book from a past date etc.


## Key features

Customer registration and login
Car catalogue with images of cars and prices
Car rental booking with date selection
Automatic price calculation based on number of days a customer rents the car
Responsive UI using Bootstrap to allow for smaller devices etc.


## Running the project

Install dependencies in both client and server folders: npm install
start the back end server: node app.js
start the front end : npm start


## Demonstration of the crazy car rental app recorded on snippet and uploaded to you tube:
https://youtu.be/A5Na2Wo-Rr4?si=uuOBwL5tNiY5wPRZ

