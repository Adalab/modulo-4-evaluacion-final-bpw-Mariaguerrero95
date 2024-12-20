# T-Shirt Shop Project from María Guerrero

Welcome!

This is a REST API for managing t-shirts in an online t-shirt shop. It uses Node.js with Express, a MySQL database, and supports EJS templates.

## Installation

1. Clone this repository
   git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-Mariaguerrero95.git

2. Install the necessary dependencies with the following command:
   npm install

3. Create an .env file in the root of the project with the following information:

PASSWORD_DB = (your password here)

4. Make sure you have a MySQL database created called TShirtShop and that the products are set up. You can use the db/TShirtShop.sql file to create them!

5. Start the server:
   `npm run dev`

## Endpoints

### Get the user

`GET /user`

### Create a new user

`POST /user`

### Update a user by ID

`PUT /user/:id`

### Delete a user by ID

DELETE /user/:id
This delete a specific user from the database by its ID

### View users on a website

GET /web/user
Renders a webpage displaying the users using the EJS template

### Dependencies

MySQL2
Express
EJS
dotenv
cors

## Credits

This project was created by the student María Guerrero and thanks to Professor Ana from Adalab.
