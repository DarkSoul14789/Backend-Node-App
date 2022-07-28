# Backend-Node-App
Features JWT authentication

# Steps to run locally
1) `git clone https://github.com/DarkSoul14789/Backend-Node-App.git`
2) `cd Backend-Node-App`
3) `npm i`
4) Create a .env file in the root of the application
5) `MONGO_URL = ` [Add your MongoDB url here]
6) `JWT_KEY = ` [Add any key which is secure enough]
7) `CRYPTO_KEY = ` [Add a key here too]
8) `npm start`
9) The app should run on port 8800 if everything is followed correctly.

# API documentation
'/register' is used to register.
Add 'username', 'email' and 'password' fields in the body

'/login' is used to login
Login is done via 'email' and 'password' fields

'/users' is a public api used to fetch all the users specifically their usernames

'/edit/:id' is a protected api which can only be accessed by logged in users
Add the following key-value pair in the header when making a request <br>
token: Bearer [JWT access token]
Add the fields you want to update in the body of the request

Postman collection json file is added in the repository for clarity
