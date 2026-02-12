# Crazy Car Rental- Fergal Hughes

This is a full stack car rental application built using React, Node.js, Express, bootstrap and MySql.
The system allows a customer to create an account, register, login, browse cars, make rental bookings and contact the company.
An Admin user can view current rental through a dashboard

## Project Approach

The project was designed in the database first using MySQL.I wanted to ensure that the relationships between the entities were clearly defined from the start. The database consists of 4 main entities customers, cars, car_model and rentals.It also consists of other entities like car_cleaning and car_technician and car_inspection but these were really for future enhancements.
The ERD was created using Lucid chart to define the primary keys, foreign keys and relationships.The rentals table acts as a junction entity linking customers and cars with one-to-many relationships used throughout.

See ERD folder and Screenshots

## Back end Development

A Node.js and Express server were created to the Rest API endpoints.The API handles customer registration, login,
car and rental creation.The server side validation is implemented to ensure the required fields are provided to prevent duplicated entries by a user.
Password hashing is implemented using bycrypt to ensure secure storage of user credentials.JSON web tokens(JWT)
are used for authentication and role-based access control.
Middleware is used to:Verify tokens,Protect routes,restrict admin-only access.
Server side validation is implemented to ensure required fields are provided and to prevent duplicate or invalid entries.

The back end communicates with MySQL using parameterised queries to prevent SQL injection.
## Front end Development 
The front end was built using React and React Router.

The application consists of multiple pages including:

Home

Login

Create Account

Register (customer details)

Dashboard (Admin only)

Contact

Axios is used to communicate with the back end API.

Client side validation is implemented for forms, including:

Required field checks

Date validation for bookings

Prevention of booking past dates

The navigation bar dynamically updates based on login status and user role.

Bootstrap is used to ensure the UI is responsive across different screen sizes.

## Authentication and roles

Two types of users exist in the system:

User

Admin

Users can:

Login

Register customer details

Rent cars

Submit contact messages

Admins can:

Access the dashboard

View current rentals

View rental status (Current, Upcoming, Completed)

JWT tokens are stored in localStorage and used to protect API routes.

## Key features

User account creation with email and password

Secure password hashing with bcrypt

JWT authentication

Role-based dashboard access

Car catalogue with images and pricing

Rental booking with date selection

Automatic price calculation based on rental duration

Rental status logic (Current / Upcoming / Completed)

Stripe payment integration

Contact form with emergency contact display

Responsive UI using Bootstrap


## Running the project

Install dependencies in both client and server folders: npm install

start the back end server: node app.js
start the front end : npm start

## Recent enhancements
Added secure user authentication using JWT

Added role-based access control

Added contact form with database storage

Added rental status logic

Improved dashboard display

Added Stripe payment functionality

Improved responsive navigation bar

## Future enhancements
These 2 table exist in the database:

Technician Table to show if car is in for repairs or checked over before release back to available to rent
Cleaning Table for when car is returned and needs to be cleaned

## Demonstration of the crazy car rental app recorded on snippet and uploaded to you tube:

https://youtu.be/A5Na2Wo-Rr4?si=uuOBwL5tNiY5wPRZ

## GitHub repo Link

https://github.com/ferghugh/crazy-car-rental.git
