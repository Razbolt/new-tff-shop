# TFF-Shop
- This project can be run in the localhost:3000 and also in 
 https://tff-ecom-client.herokuapp.com/

- This project is basicaly an e-commerce apllication for  teams and user that can teams can sell their products and people can buy their products for they favorite team.

# User documentation:
## Instalation
in order to install this project first you need to instal some npm as  ``` npm install <package_name>```
 which first ``` npm i start  ``` to build our project and for server side ``` npm i nodemon ```
 ## Run the Software
 to run this project ``` npm start ``` command must be type in terminal, for the server side run project with ``` nodemon index.js ```
 ## Bug Reports and any bugs
 for any bug, you can send it to this repository with to me, but currently no bugs found in this application
 
 
 # Developer Documentation
 ## Client Side
 We have a client and server folders which basically client side is front-end and server side is for backend,
 mostly thing are working in master branch but all of them contained from ``` 'erdem' ``` branch 
 The layout of this project is in client folder there are ``` public``` and ``` src ``` folders, 'public' folder contains the React APP user interface that contains react photos and logos within them.
 * in 'src' folder there are ``` component ```,``` context ```,  ```images ```,``` pages ``` and also App.js and index.js.
* In index.js is the main file that react app working, we use App.js function in index.js to build our client side. For App js file we use this in order to build some routers within this apllication to router our button to go other directories in application.

 * In pages folder containts pages that for authentication, users and admin also for all users can acces Home page and Shop within these. With authentication page, we check to route to acces either  admin page or user pages.
 * In context we mainly provide a authentication for login which is a usser acces control in so that users can not acces to admin page with tokenization.
 * In component we have cards that contain Jumbotron to create better visulation to user, also we have forms to use in categoryform which help us to click each category, update and delete them.
 * In nav, we have three different Menu for Admin,User and Menu that works in authentication to acces them.
 
 ## Server side
 * In Server have a index.js file which is most important that contain connection server and backend with mongoDB. Other folders are contollers, models, helper, and routers.
 * In routers we have routers that help us to get CRUD operation for both, category,login,register,products containts all get,delete,pull and post functions.
 In helpers we have a functions which connected to routers file that help us to accces this function in database to create, delete or views things that have perform in client side and database.
 * In models, we create 3 different models for categories,products and users to connect their attributes with mongoDB, this allow us to create complex system with model documentation.
 * In middleware, we create tokens to auhentation to admin and user which they can not acces admin page even if they are try to use server side application such as POSTMAN. This middleware contains requireSigin() function to they need to be first sigin to application.
 * In helper we have 'auth.js' which hash password that person entered in the client side so, in database password is not stored as string but they are stored as hash and we compare this hash values when they entered in client side.